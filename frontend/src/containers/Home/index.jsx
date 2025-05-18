import { CategoryCarousel } from '../../components/CategoryCarousel';
import { Banner, Container, Content } from '../Home/styles';
export default function Home() {
  return (
    <main>
      <Banner>
        <h1>Bem-vindo!</h1>
      </Banner>

      <Container>
        <Content>
          <CategoryCarousel />
          <div>Carrossel produtos</div>
        </Content>
      </Container>
    </main>
  );
}
