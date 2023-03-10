import IndexField from './components/IndexField'
import DetailField from './components/DetailField'
import FormField from './components/FormField'
import Stage from './components/stage';
Nova.booting((app, store) => {
  app.component('stage', Stage)
  app.component('index-configurationjson', IndexField)
    app.component('detail-configurationjson', DetailField)
    app.component('form-configurationjson', FormField)
})
