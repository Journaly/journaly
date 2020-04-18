const mobileBreakpoint = 850
const desktopBreakpoint = 1200

export const navConstants = {
  mobileBreakpoint,
  desktopBreakpoint,
  mobileNavOnly: `max-width: ${mobileBreakpoint - 1}px`,
  aboveMobileNav: `min-width: ${mobileBreakpoint}px`,
  skinnyNavToDesktop: `
    min-width: ${mobileBreakpoint}px) and (max-width: ${desktopBreakpoint - 1}px
  `,
  aboveDesktopNav: `min-width: ${desktopBreakpoint}px`,
  zIndex: 100,
  skinnyNavWidth: 80,
  navWidth: 230,
  transitionDuration: 300,
}
