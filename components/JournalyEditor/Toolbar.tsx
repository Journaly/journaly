import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import theme from '@theme'
import { headerHeight } from '@components/Dashboard/dashboardConstants'
import { navConstants } from '@components/Dashboard/Nav'

const Toolbar: React.FC = ({ children }) => {
  const toolbarRef = useRef<HTMLDivElement>(null)
  const [isFixed, setIsFixed] = useState(false)
  // Save the initial distance that the toolbar is from the top of the page
  const originalElementOffsetTop = toolbarRef?.current?.offsetTop as number
  // Save height of toolbar so that when it's fixed and removed from document flow,
  // the parent takes the same height and surrounding content won't collapse
  const fixedDistanceFromTop = 20
  const toolbarHeight = toolbarRef.current?.getBoundingClientRect().height || 56
  const toolbarClasses = classNames('editor-toolbar-container', { 'is-fixed': isFixed })

  const handleScroll = () => {
    if (toolbarRef.current) {
      if (!isFixed && window.pageYOffset >= toolbarRef.current.offsetTop - fixedDistanceFromTop) {
        setIsFixed(true)
        return
      }

      if (isFixed && window.pageYOffset + fixedDistanceFromTop < originalElementOffsetTop) {
        setIsFixed(false)
        return
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isFixed, originalElementOffsetTop])

  return (
    <div className={toolbarClasses} ref={toolbarRef}>
      <div className="editor-toolbar">{children}</div>

      <style jsx>{`
        .editor-toolbar-container {
          height: ${toolbarHeight}px;
        }

        .editor-toolbar {
          display: flex;
          justify-content: center;
          padding: 15px 0;
          margin-bottom: 10px;
          border-bottom: 2px solid #eee;
        }

        .is-fixed .editor-toolbar {
          position: fixed;
          top: calc(${headerHeight} + ${fixedDistanceFromTop}px);
          left: 50%;
          transform: translateX(-50%);
          padding: 15px;
          background: ${theme.colors.white};
          border-radius: 5px;
          box-shadow: 0px 8px 10px #00000029;
          border: 1px solid #eee;
        }

        @media (${navConstants.skinnyNavToDesktop}) {
          .is-fixed .editor-toolbar {
            top: ${fixedDistanceFromTop}px;
            left: calc(50% + ${navConstants.skinnyNavWidth / 2}px);
          }
        }

        @media (${navConstants.aboveDesktopNav}) {
          .is-fixed .editor-toolbar {
            top: ${fixedDistanceFromTop}px;
            left: calc(50% + ${navConstants.navWidth / 2}px);
          }
        }
      `}</style>
    </div>
  )
}

export default Toolbar
