import { IStatus } from "@/types/order"

export const StatusBadge = ({ status }: { status: IStatus }) => {
    const statusConfig = {
      pending: {
        icon: '🕒',
        color: 'text-yellow-400',
        label: 'Обробляється'
      },
      shipped: {
        icon: '🚚',
        color: 'text-blue-400',
        label: 'В дорозі'
      },
      delivered: {
        icon: '✅',
        color: 'text-emerald-400',
        label: 'Доставлено'
      }
    }
  
    const { icon, color, label } = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  
    return (
      <div className={`flex items-center gap-2 ${color}`}>
        <span className="text-xl">{icon}</span>
        <span className="font-semibold">{label}</span>
      </div>
    )
  }