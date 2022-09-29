import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { MEDUSA_BACKEND_URL } from '@lib/config';

export default function AskToya() {
  
  const httpClient = axios.create({
    baseURL: MEDUSA_BACKEND_URL
  })

  const [img, setImg] = useState(null)

  //is loading Spinner
  const [isLoading, setIsLoading] = useState(false)

  //User Data
  const [user, setUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    body: '',
  });

  function resetForm(e) {
    e.preventDefault();
    e.target.reset();
  }

  //Get user Data From Form Inputs
  function getUserData(e) {
    let myUser = { ...user }; //Deep Copy
    myUser[e.target.name] = e.target.value; // change data
    setUser(myUser);
  }

  //Submit contact Form
  async function submitLoginForm(e) {
    //stop Browser reload on submit
    e.preventDefault();
    //show loading Spinner
    // setIsLoading(true);
    //post User Data To Data base

    const form = new FormData();

    form.append("name", user.name);
    form.append("email", user.email);
    form.append("attachment", img, img?.name);
    form.append("phoneNumber", user.phoneNumber);
    form.append("body", user.body);

    let { status } = await httpClient.post("/store/messages/ask", form, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    })

    if (status === 200) {
      //stop Loading Spinner
      // setIsLoading(false);
    }
    else {
      //stop Loading Spinner
      // setIsLoading(false);
    }
    resetForm(e)
  }

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
                <form onSubmit={submitLoginForm}>
                  <label htmlFor="name" className='text-sm'>Name</label>
                  <input onChange={getUserData} id='name' type="text" name='name' placeholder='Name' className='w-100 border py-1 px-2 mt-2 rounded-1 focus:outline-0' />

                  <label htmlFor="email" className='mt-3 text-sm'>Email</label>
                  <input onChange={getUserData} id='email' type="email" name='email' placeholder='Email' className='w-100 border py-1 px-2 mt-2 rounded-1 focus:outline-0' />

                  <label htmlFor="phone" className='mt-3 text-sm'>Phone Number</label>
                  <input onChange={getUserData} id='phone' type="number" name='phoneNumber' placeholder='Phone Number' className='w-100 border py-1 px-2 mt-2 rounded-1 focus:outline-0' />

                  <label htmlFor="upload" className='mt-3 text-sm'>Upload Photo</label>
                  <input onChange={(e) => {
                    //set(e.target.files.item);
                    setImg(e.target.files[0])
                  }} id='upload' type="file" name='attachment' className='d-block mt-2 focus:outline-0' />

                  <label htmlFor="message" className='mt-3 text-sm'>Message</label>
                  <textarea onChange={getUserData} name="body" className='border d-block w-100 p-2 mt-2 focus:outline-0' id="message" cols="30" rows="6" placeholder='message'></textarea>

                  <button type='submit' className='btn toya-bg text-white mt-4 w-100 fw-bold'>Send</button>
                </form>
              </div>
            </div>
            <div className="col-md-4 flex justify-center">

              <img src="/Ask-toya.png" alt="Ask-toya" className='w-100  h-100 mt-4 mt-md-0 d-none d-md-block  ' />

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
