import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"

export default function About() {
  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center px-5">
      <Card className="border-0">
        <Card.Title className="mb-4"> Привет, меня зовут Владислав.</Card.Title>
        <Card.Text>
          Я студент, изучаю программную инженерию в Донецком национальном
          техническом университете.
        </Card.Text>
        <Card.Text>
          В свободное время разрабатываю{" "}
          <a href="https://github.com/VladBrok/">персональные проекты</a> и
          принимаю участие в разработке проектов с открытым исходным кодом,
          среди которых:
        </Card.Text>
        <ul>
          <li>
            <a href="https://github.com/mre/vscode-snippet">vscode-snippet</a> -
            расширение vscode для обращения к сервису{" "}
            <a href="https://cht.sh">cht.sh</a>
          </li>
          <li>
            <a href="https://github.com/MitchellMarkGeorge/TabButler">
              TabButler
            </a>{" "}
            - браузерное расширение для управления вкладками
          </li>
          <li>
            <a href="https://github.com/rohitdasu/projectmate">Projectmate</a> -
            сайт для поиска проектов с открытым исходным кодом
          </li>
        </ul>
        <Card.Text>
          Кроме того, у меня есть опыт работы на должности Junior Frontend
          Developer (6 месяцев).
        </Card.Text>
        <Card.Text>
          Со мной можно связаться по{" "}
          <a href="https://t.me/VladBrok">Телеграму</a> или дискорду
          (VladBrok#3994).
        </Card.Text>
      </Card>
    </Container>
  )
}
