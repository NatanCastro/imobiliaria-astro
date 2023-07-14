import { AttachMoney, House, Payments } from '@mui/icons-material'

const services = [
  {
    icon: <AttachMoney fontSize='inherit' />,
    title: 'Financiamento habitacional',
    description:
      'Oferecemos empréstimos com condições vantajosas e sem a necessidade de avalista para funcionários de órgãos conveniados e aposentados do INSS. Aproveite nossas excelentes condições de crédito.'
  },
  {
    icon: <House fontSize='inherit' />,
    title: 'Anuncie seu Imóvel',
    description:
      'Divulgue o seu imóvel conosco! Temos as melhores opções de anúncios para você que deseja vender ou alugar a sua propriedade. Conte com a nossa equipe especializada e alcance um público maior. Anuncie agora mesmo com a gente!'
  },
  {
    icon: <Payments fontSize='inherit' />,
    title: 'Empréstimos Consignado',
    description:
      'Precisando de dinheiro? Faça um empréstimo consignado! Com taxas de juros reduzidas e pagamento facilitado, o empréstimo consignado é a solução ideal para quem precisa de dinheiro rápido e sem burocracia.'
  }
]

export const Services = () => {
  return (
    <section className='mx-auto my-24 max-w-5xl px-4'>
      <h1 className='mb-12 text-4xl text-dark-blue'>Nossos Serviços</h1>
      <div className='flex flex-col items-center justify-evenly gap-16 lg:flex-row lg:items-start'>
        {services.map(({ icon, title, description }, index) => (
          <div className='max-w-md' key={index}>
            <span className='my-8 text-[40px] text-dark-blue'>{icon}</span>
            <h1 className='my-4 h-[4.5rem] text-3xl'>{title}</h1>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
