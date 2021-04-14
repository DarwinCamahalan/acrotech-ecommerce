import './styles.scss'

const LoadMore = ({ onLoadMoreEvt = () => {} }) => {
  return (
    <button className="load-more-btn" onClick={() => onLoadMoreEvt()}>
      <strong>See More</strong>
    </button>
  )
}

export default LoadMore
