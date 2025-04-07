import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

const SidebarContext = React.createContext(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

const SidebarProvider = React.forwardRef(({ children, ...props }, ref) => {
  const [open, setOpen] = React.useState(true)
  const [openMobile, setOpenMobile] = React.useState(false)
  const isMobile = useIsMobile()

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const toggleSidebar = React.useCallback(() => {
    setOpen((open) => !open)
  }, [])

  const value = React.useMemo(
    () => ({
      state: open ? "expanded" : "collapsed",
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    }),
    [open, openMobile, isMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={value}>
      <div ref={ref} {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  )
})
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef(({ className, ...props }, ref) => {
  const { open, isMobile } = useSidebar()

  return (
    <aside
      ref={ref}
      data-state={open ? "expanded" : "collapsed"}
      className={cn(
        "group/sidebar relative flex h-full flex-col overflow-hidden border-r bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
        open
          ? `w-[${SIDEBAR_WIDTH}]`
          : `w-[${SIDEBAR_WIDTH_ICON}] hover:w-[${SIDEBAR_WIDTH}]`,
        isMobile && "fixed inset-y-0 left-0 z-50",
        className
      )}
      {...props}
    />
  )
})
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex h-14 items-center border-b px-4", className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex-1 overflow-auto py-2", className)}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex h-14 items-center border-t px-4", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarToggle = React.forwardRef(({ className, ...props }, ref) => {
  const { open, toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("h-6 w-6", className)}
      onClick={toggleSidebar}
      {...props}
    >
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarToggle.displayName = "SidebarToggle"

const SidebarSearch = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div className={cn("px-3 py-2", className)}>
      <Input
        ref={ref}
        type="search"
        placeholder="Search..."
        className="h-9"
        {...props}
      />
    </div>
  )
})
SidebarSearch.displayName = "SidebarSearch"

const SidebarNav = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <nav
      ref={ref}
      className={cn("flex flex-col space-y-1 px-3", className)}
      {...props}
    />
  )
})
SidebarNav.displayName = "SidebarNav"

const SidebarNavItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center space-x-2 rounded-md px-3 py-2", className)}
      {...props}
    />
  )
})
SidebarNavItem.displayName = "SidebarNavItem"

const SidebarNavLink = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <a
      ref={ref}
      className={cn(
        "flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  )
})
SidebarNavLink.displayName = "SidebarNavLink"

const SidebarNavButton = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  )
})
SidebarNavButton.displayName = "SidebarNavButton"

const SidebarNavIcon = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex h-5 w-5 items-center justify-center", className)}
      {...props}
    />
  )
})
SidebarNavIcon.displayName = "SidebarNavIcon"

const SidebarNavText = React.forwardRef(({ className, ...props }, ref) => {
  const { open } = useSidebar()

  if (!open) {
    return null
  }

  return (
    <span
      ref={ref}
      className={cn("flex-1 overflow-hidden text-ellipsis", className)}
      {...props}
    />
  )
})
SidebarNavText.displayName = "SidebarNavText"

const SidebarNavBadge = React.forwardRef(({ className, ...props }, ref) => {
  const { open } = useSidebar()

  if (!open) {
    return null
  }

  return (
    <span
      ref={ref}
      className={cn(
        "ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-sidebar-primary text-xs font-medium text-sidebar-primary-foreground",
        className
      )}
      {...props}
    />
  )
})
SidebarNavBadge.displayName = "SidebarNavBadge"

const SidebarNavSeparator = React.forwardRef(({ className, ...props }, ref) => {
  const { open } = useSidebar()

  if (!open) {
    return null
  }

  return <Separator ref={ref} className={cn("my-2", className)} {...props} />
})
SidebarNavSeparator.displayName = "SidebarNavSeparator"

const SidebarNavGroup = React.forwardRef(({ className, ...props }, ref) => {
  const { open } = useSidebar()

  if (!open) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1 px-3 py-2", className)}
      {...props}
    />
  )
})
SidebarNavGroup.displayName = "SidebarNavGroup"

const SidebarNavGroupTitle = React.forwardRef(({ className, ...props }, ref) => {
  const { open } = useSidebar()

  if (!open) {
    return null
  }

  return (
    <h4
      ref={ref}
      className={cn(
        "px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground",
        className
      )}
      {...props}
    />
  )
})
SidebarNavGroupTitle.displayName = "SidebarNavGroupTitle"

const SidebarMobile = React.forwardRef(({ className, ...props }, ref) => {
  const { openMobile, setOpenMobile, isMobile } = useSidebar()

  if (!isMobile) {
    return null
  }

  return (
    <Sheet open={openMobile} onOpenChange={setOpenMobile}>
      <SheetContent
        ref={ref}
        side="left"
        className={cn("w-[18rem] p-0", className)}
        {...props}
      />
    </Sheet>
  )
})
SidebarMobile.displayName = "SidebarMobile"

const SidebarMobileTrigger = React.forwardRef(({ className, ...props }, ref) => {
  const { setOpenMobile, isMobile } = useSidebar()

  if (!isMobile) {
    return null
  }

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("h-6 w-6", className)}
      onClick={() => setOpenMobile(true)}
      {...props}
    >
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Open Sidebar</span>
    </Button>
  )
})
SidebarMobileTrigger.displayName = "SidebarMobileTrigger"

const SidebarSkeleton = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex h-full flex-col space-y-4 p-4", className)}
      {...props}
    >
      <Skeleton className="h-8 w-8" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
})
SidebarSkeleton.displayName = "SidebarSkeleton"

export {
  SidebarProvider,
  useSidebar,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarToggle,
  SidebarSearch,
  SidebarNav,
  SidebarNavItem,
  SidebarNavLink,
  SidebarNavButton,
  SidebarNavIcon,
  SidebarNavText,
  SidebarNavBadge,
  SidebarNavSeparator,
  SidebarNavGroup,
  SidebarNavGroupTitle,
  SidebarMobile,
  SidebarMobileTrigger,
  SidebarSkeleton,
} 