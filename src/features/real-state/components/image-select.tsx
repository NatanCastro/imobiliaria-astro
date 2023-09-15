import { OrderList } from 'primereact/orderlist'
import { Ref, useState } from 'react'

interface ImageSelectProps {
  name: string
  inputId: string
  inputRef: Ref<HTMLInputElement>
  onChange: (files: File[]) => void
}

const ImageTemplate = (file: File) => {
  const url = URL.createObjectURL(file)
  return <img key={file.name} src={url} alt='' className='w-full' />
}

export const ImageSelect: React.FC<ImageSelectProps> = ({ onChange }) => {
  const [images, setImages] = useState<File[]>()

  return (
    <div>
      <input
        type='file'
        multiple
        onChange={(e) => {
          const files = [...(e.target.files as FileList)]
          setImages(files)
          onChange(files)
        }}
      />
      <OrderList
        value={images}
        itemTemplate={ImageTemplate}
        onChange={(e) => setImages(e.value)}
        dragdrop
      />
    </div>
  )
}
