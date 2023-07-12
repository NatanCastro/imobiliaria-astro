import { useState } from 'react'
import { Modal } from './header-modal'
import { Menu } from '@mui/icons-material'
import { Phone, WhatsApp } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { Sidebar } from 'primereact/sidebar'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

export const Header = () => {
	const [modal, setModal] = useState(false)

	return (
		<header className='flex w-full flex-row items-center justify-between bg-gray-100 px-7 py-3 text-xl max-sm:px-3'>
			<Link to='/'>
				<h1 className='text-3xl'>LOGO</h1>
			</Link>
			<div className='flex items-center gap-14 max-sm:gap-6'>
				<ul className='flex items-center gap-4 text-xl max-md:hidden'>
					<li>
						<Link
							className='flex items-center gap-4'
							to='https://wa.me/+0000000000000'
							target='_blank'>
							<WhatsApp className='text-2xl' />
							(00) 00000-0000
						</Link>
					</li>
					<li>
						<Link
							className='flex items-center gap-4 max-[769px]:hidden'
							to='tel:000000000000'
							target='_blank'>
							<Phone className='text-2xl' />
							(00) 00000-0000
						</Link>
					</li>
				</ul>
				<SignedIn>
					<UserButton afterSignOutUrl='/' />
				</SignedIn>
				<SignedOut>
					<Link
						className='rounded-xl border-[3px] border-dark-blue px-3 py-2 capitalize transition
          hover:bg-dark-blue hover:text-white'
						to='/login'>
						entrar
					</Link>
				</SignedOut>
				<div>
					<button
						onClick={() => setModal(true)}
						className='text-5xl'
						aria-label='botão menu'
						aria-controls={modal ? 'menu' : undefined}
						aria-expanded={modal}>
						<Menu className='text-dark-blue' fontSize='inherit' />
					</button>
					<Sidebar
						id='menu'
						role='menu'
						fullScreen
						visible={modal}
						onHide={() => setModal(false)}>
						<Modal />
					</Sidebar>
				</div>
			</div>
		</header>
	)
}
