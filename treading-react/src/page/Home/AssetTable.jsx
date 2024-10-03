import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useDispatch } from "react-redux"

import { useNavigate } from "react-router-dom"

const AssetTable = ({ coin, category }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <Table>
            <ScrollArea className={`${category=="all"?"h-[77.3vh]":"h-[82vh]"}`}>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Coin</TableHead>
                    <TableHead>SYMBOL</TableHead>
                    <TableHead>VOLUME</TableHead>
                    <TableHead>MARKET CAP</TableHead>
                    <TableHead>24 HOURS</TableHead>
                    <TableHead className="text-right">PRICE</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {coin.map((item, index) => <TableRow key={item}>
                    <TableCell
                        onClick={() => navigate(`/market/${item.id}`)}
                        className="font-medium flex items-center gap-2">
                        <Avatar className='-z-50'>
                            <AvatarImage src={item.image} />
                        </Avatar>
                        <span>{item.name}</span>
                    </TableCell>
                    <TableCell>{item.symbol.toUpperCase()}</TableCell>
                    <TableCell>{item.total_volume}</TableCell>
                    <TableCell>{item.market_cap}</TableCell>
                    <TableCell>{item.market_cap_change_percentage_24h}%</TableCell>
                    <TableCell className="text-right">${item.current_price}</TableCell>
                </TableRow>)}

            </TableBody>
            </ScrollArea>
            
        </Table>

    )
}

export default AssetTable