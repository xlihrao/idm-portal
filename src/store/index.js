import devConfigureStore from './configureStore.dev'
import prodConfigureStore from './configureStore.prod'

// process.env.NODE_ENV - global variable
const configureStore = process.env.NODE_ENV === 'dev' ? devConfigureStore : prodConfigureStore

export default configureStore
