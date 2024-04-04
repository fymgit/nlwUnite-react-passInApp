import { ComponentProps } from "react"
// chamado de type generics , dentro das <> é indicado uma tag, que dá ao componente acesso aos atributos de uma tag html, o que não ocorre naturalmente

//tipagem
interface NavlinkProps extends ComponentProps<'a'> {
    children: string,
}


export function Navlink (props: NavlinkProps) {
    return (
        
        <a {...props} className='font-medium text-sm' >{props.children}</a>
        //uso do spread operator, para acessar todas as props passadas no componente Navlink de forma automáica pelo <a>
    )

}