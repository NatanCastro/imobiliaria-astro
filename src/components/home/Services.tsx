import { AttachMoney, House, Payments } from '@mui/icons-material'

export const Services = () => {
  return (
    <section className='mx-auto my-32 max-w-5xl px-4'>
      <h1 className='mb-12 text-4xl text-dark-blue'>Nossos Serviços</h1>
      <div className='flex flex-col items-center justify-evenly gap-16 text-3xl lg:flex-row lg:items-start'>
        <div className='max-w-md'>
          <AttachMoney className='my-8 text-dark-blue' fontSize='inherit' />
          <h1 className='mb-4'>Financiamento habitacional</h1>
          <p className='text-base'>
            Oferecemos empréstimos com condições vantajosas e sem a necessidade de
            avalista para funcionários de órgãos conveniados e aposentados do INSS.
            Aproveite nossas excelentes condições de crédito.
          </p>
        </div>
        <div className='max-w-md'>
          <House className='my-8 text-dark-blue' fontSize='inherit' />
          <h1 className='mb-4'>Anuncie seu Imóvel</h1>
          <p className='text-base'>
            Divulgue o seu imóvel conosco! Temos as melhores opções de anúncios para você
            que deseja vender ou alugar a sua propriedade. Conte com a nossa equipe
            especializada e alcance um público maior. Anuncie agora mesmo com a gente!
          </p>
        </div>
        <div className='max-w-md'>
          <Payments className='my-8 text-dark-blue' fontSize='inherit' />
          <h1 className='mb-4'>Empréstimos Consignado</h1>
          <p className='text-base'>
            Precisando de dinheiro? Faça um empréstimo consignado! Com taxas de juros
            reduzidas e pagamento facilitado, o empréstimo consignado é a solução ideal
            para quem precisa de dinheiro rápido e sem burocracia.
          </p>
        </div>
      </div>
    </section>
  )
}
