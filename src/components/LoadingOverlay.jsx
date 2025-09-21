// components/LoadingOverlay.jsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { usePathname, useSearchParams } from 'next/navigation';

export default function LoadingOverlay() {
  const overlayRef = useRef(null);
  const tlRef = useRef(null);

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true); // روی بارگذاری اولیه نمایش بده

  // دی‌بونس و حداقل زمان نمایش
  const showDelayMs = 200;       // شروع نمایش اگر ناوبری طول کشید
  const minVisibleMs = 450;      // حداقل مدت نمایش پس از شروع
  const maxInitialSplashMs = 700; // نمایش اولیه کوتاه

  const showTimerRef = useRef(null);
  const hideTimerRef = useRef(null);
  const showStartedAtRef = useRef(0);

  const prefersReduced = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathKey = useMemo(
    () => `${pathname}?${searchParams?.toString() ?? ''}`,
    [pathname, searchParams]
  );

  // کمک: دسترسی به ریشه‌ی محتوا برای aria-busy
  const setBusy = (busy) => {
    const root =
      document.getElementById('app-root') ||
      document.querySelector('main') ||
      document.body;
    if (root) {
      if (busy) root.setAttribute('aria-busy', 'true');
      else root.setAttribute('aria-busy', 'false');
    }
  };

  // ساخت تایم‌لاین GSAP فقط یکبار
  useEffect(() => {
    if (!overlayRef.current) return;

    const baseDur = prefersReduced.current ? 0.001 : 0.35;

    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      overlayRef.current,
      { autoAlpha: 0, scale: 0.98 },
      { autoAlpha: 1, scale: 1, duration: baseDur, ease: 'power2.out' }
    );
    tlRef.current = tl;

    setMounted(true);
    // cleanup
    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, []);

  const clearTimers = () => {
    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  // نمایش با دی‌بونس
  const scheduleShow = () => {
    if (!mounted) return;
    clearTimers();

    // اگر همین حالا هم visible است، فقط busy را ست کن
    if (visible) {
      setBusy(true);
      return;
    }

    showTimerRef.current = setTimeout(() => {
      setVisible(true);
      setBusy(true);
      showStartedAtRef.current = performance.now();

      // از ابتدا پلی کن
      if (tlRef.current) {
        tlRef.current.eventCallback('onStart', null);
        tlRef.current.eventCallback('onComplete', null);
        tlRef.current.progress(0).play();
      }
    }, showDelayMs);
  };

  // مخفی‌سازی با رعایت حداقل زمان نمایش
  const scheduleHide = () => {
    if (!mounted) return;

    const doHide = () => {
      if (tlRef.current && overlayRef.current) {
        // بعد از ریورس کامل، visible را false کن
        tlRef.current.eventCallback('onReverseComplete', () => {
          setVisible(false);
          setBusy(false);
        });

        // اگر reduced motion، بدون انیمیشن پنهان کن
        if (prefersReduced.current) {
          overlayRef.current.style.opacity = '0';
          overlayRef.current.style.visibility = 'hidden';
          setVisible(false);
          setBusy(false);
          return;
        }

        // ریورس از وضعیت فعلی
        tlRef.current.reverse();
      } else {
        setVisible(false);
        setBusy(false);
      }
    };

    // اگر هنوز شروع نمایش نشده یا اوورلی hidden است، فقط مطمئن شو busy خاموش است
    if (!visible) {
      clearTimers();
      setBusy(false);
      return;
    }

    const elapsed = performance.now() - showStartedAtRef.current;
    const waitMore = Math.max(0, minVisibleMs - elapsed);

    if (waitMore > 0) {
      hideTimerRef.current = setTimeout(doHide, waitMore);
    } else {
      doHide();
    }
  };

  // روی بارگذاری اولیه، بعد از هیدریشن اوورلی رو محو کن (با سقف زمانی کوتاه)
  useEffect(() => {
    if (!mounted) return;
    clearTimers();
    // اگر reduced motion → تقریباً فوری
    const initialDelay = prefersReduced.current ? 50 : maxInitialSplashMs;
    hideTimerRef.current = setTimeout(() => {
      scheduleHide();
    }, initialDelay);
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  // وقتی روی لینک‌های داخلی کلیک می‌شه، قبل از تغییر مسیر اوورلی را (با دی‌بونس) آماده‌ی نمایش کن
  useEffect(() => {
    const onClick = (e) => {
      try {
        if (e.defaultPrevented) return;

        // کلیک‌های اصلاح‌شده یا وسط‌کلیک
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (e.button && e.button !== 0) return;

        const a = e.target.closest('a');
        if (!a) return;

        const href = a.getAttribute('href');
        if (!href) return;

        // پروتکل‌های غیر وب
        if (/^(mailto:|tel:|sms:|ftp:|chrome:|about:|javascript:)/i.test(href)) return;

        // target _blank یا download
        const isDownload = a.hasAttribute('download') || a.getAttribute('target') === '_blank';
        if (isDownload) return;

        // URL نرمالایز‌شده
        const url = new URL(href, location.href);

        // خارجی؟
        const isExternal = url.origin !== location.origin;
        if (isExternal) return;

        // فقط hash؟
        const isHashOnly = url.pathname === location.pathname && url.search === location.search && url.hash;
        if (isHashOnly) return;

        // همان مسیر و همان query؟ (تغییر خاصی نمی‌کند)
        const isSameFullPath = url.pathname === location.pathname && url.search === location.search && (!url.hash || url.hash === location.hash);
        if (isSameFullPath) return;

        // همه‌چیز اوکی: نمایش با دی‌بونس
        scheduleShow();
      } catch {
        // در صورت خطا، مزاحم نشو
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, visible]);

  // وقتی مسیر (pathname یا query) عوض شد، اوورلی را محو کن
  useEffect(() => {
    if (!mounted) return;
    // اجازه بده صفحه‌ی جدید یک پینت بزند، سپس hide (minVisible رعایت می‌شود)
    const id = setTimeout(() => scheduleHide(), 120);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathKey, mounted]);

  // روی رفرش/خروج صفحه، اوورلی دیده می‌شه (اثرش کوتاهه اما حس درستی می‌ده)
  useEffect(() => {
    const onBeforeUnload = () => {
      if (overlayRef.current) {
        overlayRef.current.style.opacity = '1';
        overlayRef.current.style.visibility = 'visible';
      }
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-white/80 dark:bg-neutral-900/80
        backdrop-blur-sm
        select-none
      "
    >
      <div
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        className="wheel-and-hamster"
      >
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
          </div>
        </div>
        <div className="spoke"></div>
      </div>
    </div>
  );
}
