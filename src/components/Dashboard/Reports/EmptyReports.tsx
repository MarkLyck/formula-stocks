import { Empty, Space } from 'antd'

const openHelpArticle = () => $crisp.push(['do', 'helpdesk:article:open', ['en', '1nwfter']])

const EmptyReports = () => (
  <Empty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    description={
      <Space direction="vertical">
        <span>No reports found</span>
        <a href="#API" onClick={openHelpArticle}>
          Can't find the company you are looking for?
        </a>
      </Space>
    }
  />
)

export default EmptyReports
