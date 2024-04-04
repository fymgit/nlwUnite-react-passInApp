import nlwUniteIcon from '../assets/icon.svg'
import { Navlink } from './navlink'

export function Header() {
    return (
        <div className='flex items-center gap-5 py-2'>
            <img src={nlwUniteIcon} alt="nlw Unite Icon" />
            <nav className='flex items-center gap-5'>
                
                <Navlink href="/eventos">
                    Eventos
                </Navlink>
                <Navlink href="/participantes">
                    Participantes
                </Navlink> 
            </nav>
        </div>
    )
}