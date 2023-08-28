import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { RealState } from '../../components/real-state-card.type'
import { Toast } from 'primereact/toast'
import { useNavigate } from 'react-router-dom'
import { confirmDialog } from 'primereact/confirmdialog'
import { Button } from 'primereact/button'
import { useEffect } from 'react'

interface Props {
  guid: string
  toastRef: React.RefObject<Toast>
  isLoadingFn: (state: boolean) => void
}

export const DeleteRealStateButton: React.FC<Props> = ({
  toastRef,
  guid,
  isLoadingFn
}) => {
  const navigate = useNavigate()
  const deleteRealStateMutation = useMutation({
    mutationFn: async () => {
      scroll({ top: 0 })
      const { data } = await axios.delete<RealState>(`real-state/${guid}`, {
        baseURL: import.meta.env.VITE_BACKEND_URL
      })
      return data
    },
    onSuccess: () => {
      toastRef.current?.show({
        severity: 'info',
        summary: 'Confirmado',
        detail: 'O imóvel foi deletado',
        life: 3000
      })
      navigate('/imoveis')
    }
  })

  const confirmDelete = () => {
    confirmDialog({
      message: 'Deseja mesmo apagar esse imóvel?',
      header: 'Apagar imóvel',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'sim',
      rejectLabel: 'não',
      accept: deleteRealStateMutation.mutate
    })
  }

  useEffect(() => {
    isLoadingFn(deleteRealStateMutation.isLoading)
  }, [deleteRealStateMutation.isLoading, isLoadingFn])

  return <Button onClick={confirmDelete}>apagar</Button>
}
