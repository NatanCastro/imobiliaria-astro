import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useState } from 'react'

export const ChangeLessorButton = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	return (
		<>
			<Button onClick={() => setIsOpen((prev) => !prev)}>mudar locador</Button>
			<Dialog
				header='mudar locador'
				onHide={() => setIsOpen((prev) => !prev)}
				visible={isOpen}>
				<Button disabled>confirmar</Button>
			</Dialog>
		</>
	)
}
