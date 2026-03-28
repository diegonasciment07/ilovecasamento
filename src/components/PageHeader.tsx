import WheatOrnament from './WheatOrnament'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
}

export default function PageHeader({ eyebrow = 'Rafael & Flávia', title, subtitle }: PageHeaderProps) {
  return (
    <div className="page-header">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="page-title mt-3">{title}</h1>
      <div className="flex justify-center mt-5">
        <WheatOrnament size="md" color="#B87040" />
      </div>
      {subtitle && (
        <p className="body-text-sm text-center mt-5 max-w-sm mx-auto">{subtitle}</p>
      )}
    </div>
  )
}
