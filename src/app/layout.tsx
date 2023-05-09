import Footer from "@/components/common/footer"
import Header from "@/components/common/header/header"
import './globals.css'

export const metadata = {
  title: '트립지니(Trip-Genie) :: AI 여행 일정 플래너',
  description: '트립지니(Trip-Genie) :: 간편한 여행 일정 플래너, AI 여행 플래너',

  openGraph: {
    title: '트립지니(Trip-Genie) :: AI 여행 일정 플래너',
    description: '트립지니(Trip-Genie) :: 간편한 여행 일정 플래너, AI 여행 플래너',
    images: ['og_image.png'],
    canonical: './',
    url: 'https://tripgenie.kr',
    locale: 'ko-KR',
    type: 'website',
    // languages: {
    //   'en-US': '/en-US',
    //   'de-DE': '/de-DE',
    // },
    icons: {
      icon: '/bot.png',
    },
    viewport: {
      width: 'device-width',
      shortcut: '/bot.png',
      apple: '/bot.png',
      initialScale: 1,
      maximumScale: 1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}

