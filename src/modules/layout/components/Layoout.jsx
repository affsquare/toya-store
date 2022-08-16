import Navbar from './Navbar';
export default function Layoout(props) {
  return (
    <>
      <Navbar />
      <div className="container">
        {props.children}
      </div>
    </>


  )
}