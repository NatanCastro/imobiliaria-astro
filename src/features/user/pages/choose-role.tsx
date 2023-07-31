import { ChooseRoleForm } from '../components/choose-role-form'

const ChooseRole = () => {
  return (
    <div className='m-8 flex h-[80vh] flex-col items-center gap-8'>
      <h1 className='justify-self-start text-4xl'>Como você gostaria de se cadastrar</h1>
      <ChooseRoleForm />
    </div>
  )
}

export default ChooseRole
