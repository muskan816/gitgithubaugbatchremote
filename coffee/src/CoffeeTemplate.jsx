import './App.css'
import CoffeeDetails from './CoffeeDetails'
import { menuItems } from './menuItems'

const CoffeeTemplate = () => {
  return (
    <div className='w-screen h-screen bg-black flex justify-center'>
      <div className='w-[48%] bg-gray-100'>
        {
          menuItems.map((item)=>(
            <CoffeeDetails key={item.name} item={item}/>
          ))
        }
      </div>
    </div>
  )
}

export default CoffeeTemplate