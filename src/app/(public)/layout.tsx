export default function PublicLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return <div className='w-full h-full'>{children}</div>
}
