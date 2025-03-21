import { CloudAlertIcon, CrownIcon, PopcornIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { Skeleton } from '../../../../../../components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../../../components/ui/table'
import type { Work } from '../../../../../../schemas/annict/works'
import { getWorkStaffs } from '../../../../../actions/api/get/staffs'

type StaffTableProps = {
  workId: Work['id']
}

export const StaffTable: FC<StaffTableProps> = async ({ workId }) => {
  const staffs = await getWorkStaffs(workId)

  if (staffs === null) {
    return (
      <div className="flex flex-col items-center gap-y-4 p-16">
        <CloudAlertIcon size={40} className="text-anicotto-accent" />
        <p>スタッフの取得に失敗しました</p>
      </div>
    )
  }

  if (staffs.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-4 p-16">
        <PopcornIcon size={40} className="text-anicotto-accent" />
        <p>スタッフが見当たりません</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/2">
            <div className="flex items-center gap-x-2">
              <CrownIcon />
              <span>役職</span>
            </div>
          </TableHead>
          <TableHead className="w-1/2">
            <div className="flex items-center gap-x-2">
              <UsersIcon />
              <span>スタッフ</span>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {staffs.map((staff) => (
          <TableRow key={staff.id}>
            <TableCell>
              <div className="flex items-center gap-x-2">
                <span>{staff.role_text}</span>
                {staff.role_other !== '' && (
                  <span className="text-muted-foreground">({staff.role_other})</span>
                )}
              </div>
            </TableCell>
            <TableCell>
              {staff.organization !== undefined ? (
                <Link
                  href={`/organizations/${staff.organization.id}`}
                  className="py-4 transition-colors hover:text-anicotto-accent"
                >
                  {staff.name}
                </Link>
              ) : (
                staff.person !== undefined && (
                  <Link
                    href={`/people/${staff.person.id}`}
                    className="py-4 transition-colors hover:text-anicotto-accent"
                  >
                    {staff.name}
                  </Link>
                )
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const StaffTableSkeleton = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-1/2">
          <div className="flex items-center gap-x-2">
            <CrownIcon />
            <span>役職</span>
          </div>
        </TableHead>
        <TableHead className="w-1/2">
          <div className="flex items-center gap-x-2">
            <UsersIcon />
            <span>スタッフ</span>
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-[1lh] w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[1lh] w-24" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)
