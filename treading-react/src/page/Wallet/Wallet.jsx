import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ReloadIcon, UpdateIcon } from "@radix-ui/react-icons"
import { CopyIcon, DollarSign, DownloadIcon, ShuffleIcon, UploadIcon, WalletIcon } from "lucide-react"
import TopupForm from "./TopupForm"
import WithdrawalForm from "./WithdrawalForm"
import TransferForm from "./TransferForm"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { depositMoney, getUserWallet, getWalletTransactions } from "@/State/Wallet/Action"
import { useLocation, useNavigate } from "react-router-dom"


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Wallet = () => {
  const dispatch = useDispatch();
  const {wallet} = useSelector(store => store);
  const query = useQuery()
  const orderId = query.get("order_id");
  const paymentId = query.get("payment_id")
  const stripepayPaymentId = query.get("stripe_payment_id")
  const navigate=useNavigate();

  useEffect(() => {
    handleFetchUserWallet();
    handleFetchWalletTransaction();
  }, []);

  useEffect(() =>{
    if(orderId){
      dispatch(depositMoney({
        jwt: localStorage.getItem("jwt"),
        orderId,
        paymentId: stripepayPaymentId || paymentId,
        navigate
      }))
    }
  }, [orderId, paymentId, stripepayPaymentId])

  const handleFetchUserWallet = () => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  };

  const handleFetchWalletTransaction = () => {
    dispatch(getWalletTransactions({jwt: localStorage.getItem("jwt")}))
  }

  return (
    <div className="flex flex-col items-center">
      <div className="pt-10 w-full lg:w-[60%]">
        
        <Card>
          <CardHeader className='pb-6'>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <WalletIcon size={30}/>
                <div>
                  <CardTitle className='text-2xl'>My Wallet</CardTitle>
                  <div className='flex items-center gap-2'>
                    <p className="text-gray-200 text-sm">
                      #{wallet.userWallet?.id}
                    </p>
                    <CopyIcon size={15} className="cursor-pointer hover:text-slate-400"/>
                  </div>
                </div>
              </div>
              <div>
                <ReloadIcon onClick={handleFetchUserWallet} className="w-6 h-6 cursor-pointer hover:text-gray-400"/>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign/>
              <span className="text-2xl font-semibold">
                {wallet.userWallet.balance}
              </span>
            </div>

            <div className="flex gap-7 mt-5">
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col 
                  items-center justify-center rounded-md shadows-slate-800 shadow-md">
                    <UploadIcon/>
                    <span className="text-sm mt-2">Add Money</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Top Up Your Wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TopupForm/>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col 
                  items-center justify-center rounded-md shadows-slate-800 shadow-md">
                    <DownloadIcon/>
                    <span className="text-sm mt-2">Withdrawal</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Request Withdrawal
                    </DialogTitle>
                  </DialogHeader>
                  <WithdrawalForm/>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col 
                  items-center justify-center rounded-md shadows-slate-800 shadow-md">
                    <ShuffleIcon/>
                    <span className="text-sm mt-2">Transfer</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text">
                      Transfer to other wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TransferForm/>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <div className="py-5 pt-10">
          <div className=" flex gap-2 items-center pb-5">
            <h1 className="text-2xl font-semibold">History</h1>
            <UpdateIcon className="h-7 w-7 p-0 cursor-pointer hover:text-gray-400"/>
          </div>

          <div className="space-y-5">

            {[1,1,1,1,1,1,1,1,1,1].map((item, i) => <div key={i}>
              <Card className=' flex  px-5 justify-between items-center p-2'>
                <div className="flex items-center gap-5">
                  <Avatar>
                    <AvatarFallback>
                      <ShuffleIcon/>
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <h1>Buy Asset</h1>
                    <p className="text-sm text-gray-500">2024-06-02</p>
                  </div>
                  
                  
                </div>

                <div>
                  <p className={`text-green-500`}>999 USD</p>
                </div>
                
              </Card>
            </div>)}

            
          </div>
        </div>

      </div>
    </div>
  )
}

export default Wallet 