import { CONTENT_NAVIGATION_MENU } from '../../consts/contentNavMenu'
import { Books } from '../../pages/books/books'
import { Header } from '../header/header'
import { NavigationMenu } from '../navigationMenu/navigationMenu'

import './app.scss'

function App() {
    return (
        <header>
            <Header />
            <NavigationMenu content={CONTENT_NAVIGATION_MENU} />

            {/* <ProductСategory title="All books" className="category">
        <Carousel items={renderBooks(BOOKS)} />
      </ProductСategory>

      <ProductСategory title="New" className="category">
        <Carousel items={renderBooks(BOOKS)} />
      </ProductСategory> */}

            {/* <BookDescription {...BOOK} /> */}
            {/* <Categories /> */}
            <Books />
        </header>
    )
}

export default App
