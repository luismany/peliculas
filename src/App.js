import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuTop from './componentes/MenuTop/MenuTop';

import Home from './pages/home';
import Popular from './pages/popular';
import NewMovies from './pages/new-movies';
import Search from './pages/Search/search'
import Movie from './pages/Movie/movie';
import Error404 from './pages/Error404/error404';

function App() {
  const { Header, Content } = Layout;

  return (
    <Layout>
      <Router>
        <Header style={{zIndex: 1}}>
          <MenuTop />
        </Header>

        <Content>
          <Routes>
            <Route exact path='/peliculas' element={<Home />} />
            <Route exact path='new-movies' element={ <NewMovies/>}/>
            <Route exact path='/popular' element={<Popular />} />
            <Route exact path='/search' element={<Search />} />
            <Route exact path='/movie/:id' element={ <Movie />}/>
            <Route exact path='*' element={ <Error404/>}/> 
           
          </Routes>
        </Content>
      </Router>
    </Layout>
  );
}

export default App;
