import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react" 
import { IconButton } from "./icon-button"
import { Table } from "./table/table"
import { TableHeader } from "./table/table-header"
import { TableCell } from "./table/table-cell"
import { TableRow } from "./table/table-row"
import { ChangeEvent, useEffect, useState } from "react"
//import { attendees } from "../data/attendees"

//import { formatRelative } from 'date-fns'
//import { ptBR } from "date-fns/locale"

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface Attendee {
    id: string,
    name: string,
    email: string,
    createdAt: string,
    checkedInAt: string | null
}


export function AttendeeList() {

    const [search, setSearch] = useState(() => {
        const url = new URL(window.location.toString())

        if(url.searchParams.has("search")) {
            return url.searchParams.get('search') ?? ''
        }

        return ''
    })

    const [page, setPage] = useState(() => {
        //função que pega o valor da page de search qdo existente na url e retorna ele como o valor do state
        const url = new URL(window.location.toString())

        if(url.searchParams.has("page")) {
            return Number(url.searchParams.get('page'))
        }

        return 1
    })

    const [total, setTotal] = useState(0)

    const [attendees, setAttendees] = useState<Attendee[]>([])
    
    const totalPages = Math.ceil(total / 10)

    //const page = 1
    //consumo da API

    useEffect(() => {
        const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees')
        url.searchParams.set('pageIndex', String(page - 1))
        if(search.length > 0) {
            url.searchParams.set('query', search)
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setAttendees(data.attendees)
                setTotal(data.total)
            })
    }, [page, search])

    //
    function setCurrentSearch(search: string) {
        const url = new URL(window.location.toString())
        url.searchParams.set('search', search)
        window.history.pushState({}, '', url)

        setSearch(search)
    }
    //redirecionamento de rota
    function setCurrentPage(page: number) {
        const url = new URL(window.location.toString())
        url.searchParams.set('page', String(page))
        window.history.pushState({}, '', url)

        setPage(page)
    }

    function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
        setCurrentSearch(event.target.value)
        setCurrentPage(1)
        //setPage(1)
    }

    function goToNextPage() {
        //setPage(page + 1)
        setCurrentPage(page + 1) 
    }

    function goToPrevioustPage() {
       // setPage(page - 1)
       setCurrentPage(page - 1)
    }

    function goToLastPage() {
        //setPage(totalPages)
        setCurrentPage(totalPages)
    }

    function goToFirstPage() {
        //setPage(1)
        setCurrentPage(1)  
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className='w-72 px-4 py-1.5 border  border-white/10 rounded-lg text-sm flex items-center gap-3'>
                    <Search className="size-4 text-emerald-300"/>
                    <input onChange={onSearchInputChange} value={search} className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm focus:ring-0" type="text" placeholder="Buscar participantes..." />
                </div>
            </div>
            <Table>
                <thead>
                    <tr className="border-b border-white/10">
                        <TableHeader style={{width: 48}} >
                            <input className="size-4 bg-black/20 rounded border border-white/10" type="checkbox"/>
                        </TableHeader>
                        <TableHeader >Código</TableHeader>
                        <TableHeader >Participantes</TableHeader>
                        <TableHeader >Data de inscrição</TableHeader>
                        <TableHeader >Data de Check-in</TableHeader>
                        <TableHeader style={{width: 64}} ></TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {attendees.map((attendee) => { //os paramentros do map: _ se refere a arr criada, mas como ela não tem valor fica como undefined, e o i se refere ao index de cada item da array
                        return (
                            <TableRow key={attendee.id} className="border-b border-white/10 hover:bg-white/5">
                                <TableCell> 
                                    <input className="size-4 bg-black/20 rounded border border-white/10" type="checkbox"/>
                                </TableCell>
                                <TableCell>{attendee.id}</TableCell>
                                <TableCell> 
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-white">{attendee.name}</span>
                                        <span>{attendee.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell> {dayjs().to(attendee.createdAt)}</TableCell>
                                <TableCell>{attendee.checkedInAt === null ? <span className="text-zinc-400">Não fez Check-in</span> : dayjs().to(attendee.checkedInAt)}</TableCell>
                                <TableCell> 
                                    {/* <button className="bg-black/20 border border-white/10 rounded-md p-1.5">
                                        <MoreHorizontal className="size-4 "/>
                                    </button> */}
                                    <IconButton transparent={true}>
                                        <MoreHorizontal className="size-4 "/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </tbody>
                <tfoot>
                    <TableCell colSpan={3}>
                        Mostrando {attendees.length} de {total} itens
                    </TableCell>
                    <TableCell className='text-right' colSpan={3}>
                        <div className="inline-flex gap-8 items-center">
                            <span>Página {page} de {totalPages}</span>
                            <div className="flex gap-1.5 items-center">
                                <IconButton onClick={goToFirstPage} disabled={page === 1}>
                                    <ChevronsLeft className="size-4 "/>
                                </IconButton>
                                <IconButton onClick={goToPrevioustPage} disabled={page===1}>
                                    <ChevronLeft className="size-4 "/>
                                </IconButton>
                                <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                                    <ChevronRight className="size-4 "/>
                                </IconButton>
                                <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                                    <ChevronsRight className="size-4 "/>
                                </IconButton>
                            </div>
                        </div>
                    </TableCell>
                </tfoot>
            </Table>
        </div>
    )
}