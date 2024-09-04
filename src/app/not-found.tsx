export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-4'>
      <h2 className='text-5xl font-extrabold md:text-9xl text-white'>
        4<span className='text-primary'>0</span>4
      </h2>
      <h3 className='my-1 text-center text-3xl font-bold text-white'>Oops! Trang không tồn tại</h3>
      <a href='/' type='button' className='mt-4 rounded-full bg-primary px-6 py-2.5 font-bold text-black'>
        Trang chủ
      </a>
    </div>
  )
}
