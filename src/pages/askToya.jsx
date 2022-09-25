import Link from 'next/link';

export default function AskToya() {
  return (
    <>
      <div className="container">
        <Link href="/">
          <a className=" inline-block mt-5 text-gray-700 text-sm fw-bold back-to-chart">
            <span className="icon-arrow-left fw-bold"></span> <span className="ms-2">Get back to home page</span>
          </a>
        </Link>
        <h2 className="text-center h1 toya-color my-4 ">Ask Toya</h2>
        <p className='text-center  text-gray-500 font-medium'>if you have any question feel free to ask our professional supports and get the help you need!</p>

        <div className="toya-contact my-5   ">
          <div className="row">
            <div className="col-md-8">
              <div className="toya-form border p-4 p-lg-5">

                  <label htmlFor="name" className='text-sm'>Name</label>
                  <input id='name' type="text" name='name' placeholder='Name' className='w-100 border py-1 px-2 mt-2 rounded-1' />

                  <label htmlFor="email" className='mt-3 text-sm'>Email</label>
                  <input id='email' type="email" name='email' placeholder='Email' className='w-100 border py-1 px-2 mt-2 rounded-1' />

                  <label htmlFor="phone" className='mt-3 text-sm'>Phone Number</label>
                  <input id='phone' type="number" name='phone' placeholder='Phone Number' className='w-100 border py-1 px-2 mt-2 rounded-1' />

                  <label htmlFor="upload" className='mt-3 text-sm'>Upload Photo</label>
                  <input id='upload' type="file" name='photo' className='d-block mt-2'/>

                  <label htmlFor="message" className='mt-3 text-sm'>Message</label>
                  <textarea name="message" className='border d-block w-100 p-2 mt-2' id="message" cols="30" rows="6" placeholder='message'></textarea>

                  <button type='submit' className='btn toya-bg text-white mt-4 w-100 fw-bold'>Send</button>

              </div>
            </div>
            <div className="col-md-4 flex justify-center">

                <img src="/Ask-toya.png" alt="Ask-toya" className='w-100  h-100 mt-4 mt-md-0 ' />

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
