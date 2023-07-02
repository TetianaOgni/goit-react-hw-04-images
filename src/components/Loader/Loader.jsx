import {ImSpinner} from 'react-icons/im'

function Loader() {
  const styles = {

  }
  return (
      <div style={styles.spinner}>
          <ImSpinner size='32' className='icon-spin'/>
          Loading...
      </div>
  
  )
}

export default Loader

