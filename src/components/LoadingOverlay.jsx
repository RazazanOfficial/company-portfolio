'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { usePathname, useSearchParams } from 'next/navigation';

export default function LoadingOverlay() {
  const overlayRef = useRef(null);
  const tlRef = useRef(null);

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  const showDelayMs = 200;
  const minVisibleMs = 450;
  const maxInitialSplashMs = 700;

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

  const scheduleShow = () => {
    if (!mounted) return;
    clearTimers();

    if (visible) {
      setBusy(true);
      return;
    }

    showTimerRef.current = setTimeout(() => {
      setVisible(true);
      setBusy(true);
      showStartedAtRef.current = performance.now();

      if (tlRef.current) {
        tlRef.current.eventCallback('onStart', null);
        tlRef.current.eventCallback('onComplete', null);
        tlRef.current.progress(0).play();
      }
    }, showDelayMs);
  };

  const scheduleHide = () => {
    if (!mounted) return;

    const doHide = () => {
      if (tlRef.current && overlayRef.current) {
        tlRef.current.eventCallback('onReverseComplete', () => {
          setVisible(false);
          setBusy(false);
        });

        if (prefersReduced.current) {
          overlayRef.current.style.opacity = '0';
          overlayRef.current.style.visibility = 'hidden';
          setVisible(false);
          setBusy(false);
          return;
        }

        tlRef.current.reverse();
      } else {
        setVisible(false);
        setBusy(false);
      }
    };

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

  useEffect(() => {
    if (!mounted) return;
    clearTimers();
    const initialDelay = prefersReduced.current ? 50 : maxInitialSplashMs;
    hideTimerRef.current = setTimeout(() => {
      scheduleHide();
    }, initialDelay);
    return clearTimers;
  }, [mounted]);

  useEffect(() => {
    const onClick = (e) => {
      try {
        if (e.defaultPrevented) return;

        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (e.button && e.button !== 0) return;

        const a = e.target.closest('a');
        if (!a) return;

        const href = a.getAttribute('href');
        if (!href) return;

        if (/^(mailto:|tel:|sms:|ftp:|chrome:|about:|javascript:)/i.test(href)) return;

        const isDownload = a.hasAttribute('download') || a.getAttribute('target') === '_blank';
        if (isDownload) return;

        const url = new URL(href, location.href);

        const isExternal = url.origin !== location.origin;
        if (isExternal) return;

        const isHashOnly = url.pathname === location.pathname && url.search === location.search && url.hash;
        if (isHashOnly) return;

        const isSameFullPath = url.pathname === location.pathname && url.search === location.search && (!url.hash || url.hash === location.hash);
        if (isSameFullPath) return;

        scheduleShow();
      } catch {
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [mounted, visible]);

  useEffect(() => {
    if (!mounted) return;
    const id = setTimeout(() => scheduleHide(), 120);
    return () => clearTimeout(id);
  }, [pathKey, mounted]);

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
