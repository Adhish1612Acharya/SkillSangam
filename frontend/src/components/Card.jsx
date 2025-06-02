const Card = ({ title, children, className = '', ...props }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-md p-6 ${className}`} {...props}>
      {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
      {children}
    </div>
  )
}

export default Card