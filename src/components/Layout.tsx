import { CircleAlert } from 'lucide-react'
import { Alert, AlertDescription } from './ui/alert'
// import { TermsAcceptanceModal } from "../TermsAcceptanceModal";

interface Props {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => {
  //className='flex flex-col items-center h-1/2 py-4 mt-0 lg:mt-16'>  w-[95%]
  return (
    <>
      <div className="w-full h-full absolute top-16 lg:w-fit lg:left-72">
        <Alert className="text-yellow-700 p-2 mt-1">
          <CircleAlert className="size-5" />
          <AlertDescription className="mt-3 ml-2">
            Para garantizar su protección y en cumplimiento con la
            <span className="font-medium">
              {' '}
              "Ley Orgánica de Protección de Datos Personales"
            </span>
            , su información personal se visualiza de manera segura.
          </AlertDescription>
        </Alert>
        <main className="flex flex-1 flex-col gap-4 m-2 p-2 lg:gap-6">
          {children}
          {/* <TermsAcceptanceModal /> */}
        </main>
      </div>
    </>
  )
}
