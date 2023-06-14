import { Suspense } from 'react'
import { Loading } from '../Loading'

interface AddSuspenseProps {
  fallback?: React.ReactElement
  component: React.ReactElement
}

export const AddSuspense: React.FC<AddSuspenseProps> = ({
  fallback = <Loading />,
  component
}) => {
  return <Suspense fallback={fallback}>{component}</Suspense>
}
