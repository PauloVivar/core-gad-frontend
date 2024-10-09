import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  BanknotesIcon,
  HomeModernIcon,
  RectangleGroupIcon,
  ScaleIcon
} from '@heroicons/react/24/outline'

export function Page() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Bienvenido</h1>
      </div>
      <Separator />
      <div className="flex justify-center md:justify-start w-full gap-4 flex-wrap">
        <Card className="grow basis-1/4">
          <CardHeader>
            <CardTitle>Aval&uacute;os y Catastros</CardTitle>
            <CardDescription>
              Gesti&oacute;n y consulta de tr&aacute;mites en linea.
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full h-full flex justify-center text-yellow-600">
            <HomeModernIcon className="w-20 h-20" />
          </CardContent>
        </Card>

        <Card className="grow basis-1/4">
          <CardHeader>
            <CardTitle>Pago de impuestos</CardTitle>
            <CardDescription>
              Pago de impuestos, tasas y contribuyentes.
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full h-full flex justify-center text-yellow-600">
            <BanknotesIcon className="w-20 h-20" />
          </CardContent>
        </Card>

        <Card className="grow basis-1/4">
          <CardHeader>
            <CardTitle>Control Urbano</CardTitle>
            <CardDescription>
              Gesti&oacute;n y consulta de tr&aacute;mites control urbano.
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full h-full flex justify-center text-yellow-600">
            <ScaleIcon className="w-20 h-20" />
          </CardContent>
        </Card>

        <Card className="grow basis-0">
          <CardHeader>
            <CardTitle>Varios</CardTitle>
            <CardDescription>
              Varios tr&aacute;mites en proceso.
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full h-full flex justify-center text-red-800">
            <RectangleGroupIcon className="w-20 h-20" />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
