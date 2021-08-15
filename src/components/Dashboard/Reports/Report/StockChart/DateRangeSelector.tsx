import { Select } from 'antd'
import dayjs from 'dayjs'
const { Option } = Select

const DateRangeSelector = ({ dateRange, setDateRange, setInterval }: any) => {
  const handleChange = (value: string) => {
    const numberOf = Number(value.split('-')[0])
    const unit: any = value.split('-')[1]

    if (value === '1-day') {
      setInterval('1hour')
      setDateRange({
        ...dateRange,
        value,
        from: dayjs()
          .subtract(numberOf + 1, unit)
          .format('YYYY-MM-DD'),
      })
    } else {
      setInterval('daily')
      if (value === 'all-time') {
        setDateRange({ value, from: undefined, to: undefined })
      } else {
        setDateRange({
          ...dateRange,
          value,
          from: dayjs()
            .subtract(numberOf + 1, unit)
            .format('YYYY-MM-DD'),
        })
      }
    }
  }

  return (
    <Select value={dateRange.value} style={{ width: 120 }} onChange={handleChange}>
      <Option value="1-day">Today</Option>
      <Option value="7-day">7 Days</Option>
      <Option value="1-month">30 Days</Option>
      <Option value="6-month">6 Months</Option>
      <Option value="1-year">1 Year</Option>
      <Option value="all-time">All time</Option>
    </Select>
  )
}

export default DateRangeSelector
