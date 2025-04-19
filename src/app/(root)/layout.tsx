import React, { ReactNode } from 'react'
import StreamClientProvider from "@/components/providers/StreamClientProvider";

function Layout({children}: {children: ReactNode}) {
  return (
    <StreamClientProvider>
        {children}
    </StreamClientProvider>
  )
}

export default Layout