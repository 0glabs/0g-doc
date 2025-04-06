import React from 'react'
import Footer from '@theme-original/Footer'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { MendableFloatingButton } from '@mendable/search'

export default function FooterWrapper(props) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext()
  const icon = <img height={40}  src="https://i.ibb.co/k9VWrpT/Logo-Design-2.png" />
  return (
    <>
      <MendableFloatingButton cmdShortcutKey={"b"} icon={icon} anon_key={customFields.mendableAnonKey as string} />
      <Footer {...props} />
    </>
  )
}