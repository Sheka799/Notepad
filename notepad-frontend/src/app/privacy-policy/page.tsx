import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Политика обработки персональных данных',
  description: 'Политика обработки персональных данных пользователей сервиса Notepad'
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      <header className="px-6 lg:px-8 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="-m-1.5 p-1.5">
            <img alt="logo" src="/logo.png" className="h-10 w-auto" />
          </Link>
          <Link href="/auth" className="text-sm/6 font-semibold text-gray-900">Войти <span aria-hidden="true">&rarr;</span></Link>
        </nav>
      </header>

      <div className="mx-auto max-w-3xl px-6 lg:px-8 pb-24">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl mt-6 mb-2">
          Политика обработки персональных данных
        </h1>
        <p className="text-sm text-gray-500 mb-10">Действует с 03.09.2026</p>

        <div className="space-y-8 text-gray-700 text-base/7">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Общие положения</h2>
            <p>
              Настоящая Политика определяет порядок обработки персональных данных пользователей
              веб-сервиса Notepad (далее — «Сервис»), расположенного по адресу https://notepad.web-evgeny.ru,
              и составлена в соответствии с Федеральным законом от 27.07.2006 №&nbsp;152-ФЗ
              «О персональных данных».
            </p>
            <p className="mt-2">
              Оператор персональных данных: Криволапов Евгений Игоревич, физическое лицо, контактный email: krivolapov.evgeny@mail.ru.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Какие данные мы собираем</h2>
            <p>При использовании Сервиса мы обрабатываем следующие данные:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>email, указанный при регистрации;</li>
              <li>пароль — хранится не в открытом виде, а в виде необратимого криптографического хэша (argon2), сам пароль нам не доступен;</li>
              <li>имя пользователя (если указано в настройках профиля);</li>
              <li>фотография профиля (аватар), если вы её загрузили;</li>
              <li>содержимое созданных вами заметок (блокнотов);</li>
              <li>технические данные: IP-адрес, тип браузера и устройства, файлы cookie, данные о переходах и действиях на страницах сайта.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Cookie и аналитика</h2>
            <p>
              Сервис использует файл cookie <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">refreshToken</code> —
              технически необходимый для работы авторизации, недоступен для чтения скриптами
              страницы (флаг HttpOnly).
            </p>
            <p className="mt-2">
              Для анализа посещаемости используется <strong>Яндекс.Метрика</strong> — сервис
              веб-аналитики ООО «ЯНДЕКС». Метрика автоматически собирает обезличенные технические
              данные о посещении сайта (IP-адрес, тип устройства, клики, переходы по ссылкам).
              Обработка этих данных Яндексом регулируется отдельной{' '}
              <a
                href="https://yandex.ru/legal/confidential/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-500 underline"
              >
                политикой конфиденциальности Яндекса
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Цели обработки</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>регистрация и авторизация в Сервисе;</li>
              <li>предоставление функционала Сервиса (создание, хранение и редактирование заметок);</li>
              <li>хранение и отображение аватара профиля;</li>
              <li>улучшение работы Сервиса на основе статистики использования;</li>
              <li>связь с пользователем по вопросам работы Сервиса (при необходимости).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Хранение и защита данных</h2>
            <p>
              Данные хранятся на серверах, расположенных на территории Российской Федерации.
              Аватары пользователей хранятся в объектном хранилище S3-совместимого провайдера.
              Пароли хранятся в виде хэша (argon2), доступ к базе данных ограничен, соединение
              с сайтом защищено протоколом HTTPS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Передача третьим лицам</h2>
            <p>
              Мы не продаём и не передаём ваши персональные данные третьим лицам, за исключением:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>сервиса аналитики Яндекс.Метрика (обезличенные технические данные о посещениях);</li>
              <li>провайдера объектного хранилища — для хранения файлов аватаров;</li>
              <li>случаев, прямо предусмотренных законодательством РФ.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">7. Ваши права</h2>
            <p>Вы вправе в любой момент:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>запросить информацию о том, какие ваши данные обрабатываются;</li>
              <li>потребовать исправления неточных данных (через настройки профиля);</li>
              <li>удалить свой аватар самостоятельно, из настроек профиля;</li>
              <li>отозвать согласие на обработку персональных данных и потребовать удаления аккаунта и всех связанных данных.</li>
            </ul>
            <p className="mt-2">
              Для отзыва согласия и удаления аккаунта напишите нам на krivolapov.evgeny@mail.ru.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">8. Изменения политики</h2>
            <p>
              Мы можем обновлять эту Политику. Актуальная версия всегда доступна по этому адресу.
              Дата вступления в силу указана в начале документа.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
