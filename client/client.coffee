Template.importForm.events
  'submit .import': (event, template) ->
    event.preventDefault()

    Meteor.call 'importForm', $(template.findAll '.data').val(), (error) =>
      alert error if error

    return # Make sure CoffeeScript does not return anything

  'change .data, keyup .data': (event, template) ->
    console.log $(template.findAll '.data').val()

    return # Make sure CoffeeScript does not return anything
