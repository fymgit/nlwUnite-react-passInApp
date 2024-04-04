//typescript interface declaração da tipagem
/*  
  ex: interface MyAppProps {
    nomeDaProps: type da Props
    ex: 
    texto: string,
    number: number
  }

  ex: function MyFunction(props: MyAppProps) {}
  dentro do parâmetro é indicado o objeto que define as props daquela function
*/
import { AttendeeList } from "./components/attendee-list";
import { Header } from "./components/header";

 

export function App() {
  return (
    <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
      <Header/>
      <AttendeeList/>
    </div>
  )
}
