Template.dataForm.events
  'submit .import': (event, template) ->
    event.preventDefault()

    Meteor.call 'importData', $(template.findAll '.data').val(), (error) =>
      alert error if error

    return # Make sure CoffeeScript does not return anything
