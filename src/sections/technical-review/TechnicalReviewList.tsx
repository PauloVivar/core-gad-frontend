// import React from 'react';
import { TechnicalReview } from '@/modules/technical-review/domain/TechnicalReview'

interface TechnicalReviewListProps {
  technicalReviews: TechnicalReview[]
}

export function TechnicalReviewList({
  technicalReviews
}: TechnicalReviewListProps) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>ID</th>
          <th>Fecha</th>
          <th>Comentarios</th>
          <th>Resultado</th>
        </tr>
      </thead>
      <tbody>
        {technicalReviews.map((review) => (
          <tr key={review.id}>
            <td>{review.id}</td>
            <td>{new Date(review.date).toLocaleDateString()}</td>
            <td>{review.comments}</td>
            <td>{review.result}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
