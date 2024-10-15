import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  TechnicalReview,
  ReviewResult
} from '@/modules/technical-review/domain/TechnicalReview'

const formSchema = z.object({
  date: z.string().min(1, { message: 'La fecha es requerida' }),
  comments: z.string().min(1, { message: 'Los comentarios son requeridos' }),
  result: z.nativeEnum(ReviewResult)
})

type FormValues = z.infer<typeof formSchema>

interface TechnicalReviewFormProps {
  review?: TechnicalReview
  onSubmit: (data: FormValues) => void
  onCancel: () => void
}

export function TechnicalReviewForm({
  review,
  onSubmit,
  onCancel
}: TechnicalReviewFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //date: review?.date ? new Date(review.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      date: review?.date || new Date().toISOString(),
      comments: review?.comments || '',
      result: review?.result || ReviewResult.EN_PROCESO
    }
  })

  const handleSubmit = (data: FormValues) => {
    const dateWithTimezone = new Date(data.date).toISOString()
    onSubmit({ ...data, date: dateWithTimezone })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comentarios</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="result"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resultado</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el resultado de la revisión" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(ReviewResult).map((result) => (
                    <SelectItem key={result} value={result}>
                      {result}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="submit">{review ? 'Actualizar' : 'Crear'}</Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  )
}
