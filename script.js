// Initialization
kaboom({
	global: true,
	scale: 1,
	fullscreen: true,
	debug: true,
  clearColor: [0.274, 0.450, 1, 1]
})

loadRoot('assets/')

sprites = ['backdrop', 'chip', 'click', 'dice', 'lightning', 'shop', 'steak', 'checkmark', 'checkmark_on', 'checkmark_clicked']
audios = ['click', 'play', 'startup', 'upgrade']
buttons = ['back', 'changelog', 'gear', 'play', 'up', 'down', 'upgrade', 'reset', 'yes', 'no']

sprites.forEach((name) => {loadSprite(name, 'imgs/' + name + '.png')})
buttons.forEach((name) => {loadSprite(name, 'imgs/' + name + '.png'); loadSprite(name + 'Hover', 'imgs/' + name + '_hover.png')})
audios.forEach((name) => {loadSound(name, 'auds/' + name + '.wav')})

loadFont('Mono', 'imgs/mono.png', 32, 64, " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~©")

// Splash screen
scene('splash', () => {
  play('startup')
  splash_size = 1
  splash_txt = add([
    text('Endy3032 © 2021', width() / 30, {font: "Mono"}),
    pos(width() / 2, height() / 2),
    origin('center')
  ])
  add(['splashLooper'])

  action('splashLooper', _ => {
    splash_size++
    splash_txt.scale = Math.pow(1.125, -splash_size) + 1
  })

  wait(1.5, () => {go('menu')})
})

// Menu screen
scene('menu', () => {
  add([
    text('ExecuteTapper', width() * 0.025),
    pos(width() / 2, height() * 0.4),
    origin('center')
  ])

  add([
    rect(350, 0),
    pos(width() * 0.55, height() * 0.4),
    origin('topright'),
    color(0, 0, 0, 0),
    solid()
  ])
  
  steakSprite = add([
    sprite('steak'),
    pos(width() * 0.55, height() * 0.4),
    scale(width() / 1920 * 0.4),
    origin('botright'),
    body()
  ])

  playBtn = add([
    sprite('play'),
    scale(width() / 1920 * 1.5),
    pos(width() / 2, height() * 0.7),
    origin('center')
  ])

  settingsBtn = add([
    sprite('gear'),
    scale(width() / 1920 * 0.8),
    pos(width() - width() * 0.03, width() * 0.03),
    origin('topright')
  ])

  changelogBtn = add([
    sprite('changelog'),
    scale(width() / 1920 * 0.8),
    pos(width() - width() * 0.08, width() * 0.03),
    origin('topright')
  ])

  add([
    text('v1.0-beta1', width() / 1920 * 25),
    pos(width() * 0.99, height() - width() * 0.01),
    origin('botright')
  ])

  loop(3, () => {steakSprite.jump(height() * 0.3)})

  mouseClick(() => {
    playBtn.isClicked() ? play('play') & go('game') : null
    settingsBtn.isClicked() ? go('settings') : null
    changelogBtn.isClicked() ? go('changelog') : null
  })

  if (Utils.readObject('didRunGame') === null) {
    Utils.removeObject('ranGame')
    Utils.saveObject('didRunGame', true)
    Utils.saveObject('coinCount', 10)
    Utils.saveObject('diceCount', 10)
    Utils.saveObject('showDice', true)
    Utils.saveObject('showCoin', true)
    Utils.saveObject('score', 0)
    Utils.saveObject('cps', 0)
    Utils.saveObject('click', 1)
    Utils.saveObject('cPrice', 100)
    Utils.saveObject('aPrice', 150)
    Utils.saveObject('uPrice', 500)
    Utils.saveObject('hover', false)
    Utils.saveObject('click_inc', 1.7)
    Utils.saveObject('auto_inc', 1.5)
    Utils.saveObject('clickstat_inc', 2.5)
    Utils.saveObject('cps', 0.3)
  }

  add(['menuLooper'])

  action('menuLooper', _ => {
    changelogBtn.isHovered() ? changelogBtn.changeSprite('changelogHover') : changelogBtn.changeSprite('changelog')
    settingsBtn.isHovered() ? settingsBtn.changeSprite('gearHover') : settingsBtn.changeSprite('gear')
    playBtn.isHovered() ? playBtn.changeSprite('playHover') : playBtn.changeSprite('play')
  })
})

scene('changelog', () => {
  back = add([
    sprite('back'),
    pos(width() * 0.03, width() * 0.03),
    scale(width() / 1920 * 0.8),
    origin('topleft')
  ])

  add([
    text('v1.0 - Changelog', width() / 1920 * 48),
    pos(width() / 2, height() * 0.3),
    origin('center')
  ])

  add([
    text('Fixed All Scaling & Positioning Issues! (hopefully)', width() / 1920 * 27),
    pos(width() / 2, height() * 0.4),
    origin('center')
  ])

  add([
    text('New Save/Load/Reset System', width() / 1920 * 27),
    pos(width() / 2, height() * 0.5),
    origin('center')
  ])

  add([
    text('Added Buttons Hover Animation', width() / 1920 * 27),
    pos(width() / 2, height() * 0.6),
    origin('center')
  ])

  add([
    text('Everything should look flawless on all type of screen now', width() / 1920 * 27),
    pos(width() / 2, height() * 0.7),
    origin('center')
  ])

  add([
    text('(should)', width() / 1920 * 15),
    pos(width() / 2, height() * 0.75),
    origin('center')
  ])

  mouseClick(() => {
    back.isClicked() ? go('menu') : null
  })

  add(['changelogLooper'])

  action('changelogLooper', _ => {
    back.isHovered() ? back.changeSprite('backHover') : back.changeSprite('back')
  })
})

scene('settings', () => {
  back = add([
    sprite('back'),
    pos(width() * 0.03, width() * 0.03),
    scale(width() / 1920 * 0.8),
    origin('topleft')
  ])

  add([
    text('Settings', width() / 1920 * 48),
    pos(width() / 2, height() * 0.2),
    origin('center')
  ])

  add([
    text('Show Coin Particles', width() / 1920 * 26),
    pos(width() * 0.23, height() * 0.4),
    origin('left')
  ])

  add([
    text('Show Dice Particles', width() / 1920 * 26),
    pos(width() * 0.23, height() * 0.475),
    origin('left')
  ])

  add([
    text('Coin Particles Limit', width() / 1920 * 26),
    pos(width() * 0.23, height() * 0.55),
    origin('left')
  ])

  add([
    text('Dice Particles Limit', width() / 1920 * 26),
    pos(width() * 0.23, height() * 0.625),
    origin('left')
  ])

  coinMark = add([
    sprite('checkmark'),
    pos(width() * 0.75, height() * 0.4),
    scale(Math.min(height() / 1080 * 0.7, width() / 1920 * 0.6)),
    origin('right')
  ])
  
  diceMark = add([
    sprite('checkmark'),
    pos(width() * 0.75, height() * 0.475),
    scale(Math.min(height() / 1080 * 0.7, width() / 1920 * 0.6)),
    origin('right')
  ])

  coinLimit = add([
    text(Utils.readObject('coinCount'), width() / 1920 * 26),
    pos(width() * 0.72, height() * 0.55),
    origin('right')
  ])

  coinUp = add([
    sprite('up'),
    pos(width() * 0.75, height() * 0.545),
    scale(Math.min(height() / 1080 * 0.35, width() / 1920 * 0.5)),
    origin('botright')
  ])

  coinDown = add([
    sprite('down'),
    pos(width() * 0.75, height() * 0.555),
    scale(Math.min(height() / 1080 * 0.35, width() / 1920 * 0.5)),
    origin('topright')
  ])
  
  diceLimit = add([
    text(Utils.readObject('diceCount'), width() / 1920 * 26),
    pos(width() * 0.72, height() * 0.625),
    origin('right')
  ])
  
  diceUp = add([
    sprite('up'),
    pos(width() * 0.75, height() * 0.62),
    scale(Math.min(height() / 1080 * 0.35, width() / 1920 * 0.5)),
    origin('botright')
  ])

  diceDown = add([
    sprite('down'),
    pos(width() * 0.75, height() * 0.63),
    scale(Math.min(height() / 1080 * 0.35, width() / 1920 * 0.5)),
    origin('topright')
  ])

  reset = add([
    sprite('reset'),
    pos(width() * 0.5, height() * 0.8),
    scale(width() / 1920 * 1.5),
    origin('center')
  ])
  
  mouseClick(() => {
    back.isClicked() ? go('menu') : null
    reset.isClicked() ? go('reset') : null

    coinUp.isClicked() ? Utils.saveObject('coinCount', Utils.readObject('coinCount') + 1) : null
    coinDown.isClicked() ? Utils.saveObject('coinCount', Utils.readObject('coinCount') - 1) : null
    diceUp.isClicked() ? Utils.saveObject('diceCount', Utils.readObject('diceCount') + 1) : null
    diceDown.isClicked() ? Utils.saveObject('diceCount', Utils.readObject('diceCount') - 1) : null
  })
  
  add(['settingsLooper'])
  
  action('settingsLooper', _ => {
    back.isHovered() ? back.changeSprite('backHover') : back.changeSprite('back')
    reset.isHovered() ? reset.changeSprite('resetHover') : reset.changeSprite('reset')
    coinMark.isHovered() ? coinMark.color = rgba(1, 1, 1, 0.8) : coinMark.color = rgba(1, 1, 1, 1,)
    diceMark.isHovered() ? diceMark.color = rgba(1, 1, 1, 0.8) : diceMark.color = rgba(1, 1, 1, 1)
    
    coinUp.isHovered() ? coinUp.changeSprite('upHover') : coinUp.changeSprite('up')
    coinDown.isHovered() ? coinDown.changeSprite('downHover') : coinDown.changeSprite('down')
    diceUp.isHovered() ? diceUp.changeSprite('upHover') : diceUp.changeSprite('up')
    diceDown.isHovered() ? diceDown.changeSprite('downHover') : diceDown.changeSprite('down')

    coinMark.isClicked() ? coinMark.changeSprite('checkmark_clicked') & Utils.saveObject('showCoin', !Utils.readObject('showCoin'))
    : Utils.readObject('showCoin') === true ? coinMark.changeSprite('checkmark_on')
    : coinMark.changeSprite('checkmark')
    
    diceMark.isClicked() ? diceMark.changeSprite('checkmark_clicked') & Utils.saveObject('showDice', !Utils.readObject('showDice'))
    : Utils.readObject('showDice') === true ? diceMark.changeSprite('checkmark_on')
    : diceMark.changeSprite('checkmark')

    coinLimit.text = Utils.readObject('coinCount')
    diceLimit.text = Utils.readObject('diceCount')
  })
})

scene('reset', () => {
  add([
    text('Are you sure you want to reset?', width() / 1920 * 45),
    pos(width() / 2, height() * 0.3),
    origin('center'),
    color(rgb(1, 0.411, 0.470))
  ])

  yes = add([
    sprite('yes'),
    scale(width() / 1920 * 2),
    pos(width() * 0.4, height() * 0.6),
    origin('center')
  ])  

  no = add([
    sprite('no'),
    scale(width() / 1920 * 2),
    pos(width() * 0.6, height() * 0.6),
    origin('center')
  ])  

  mouseClick(() => {
    no.isClicked() ? go('settings'): null
    yes.isClicked() ? Utils.removeObject('didRunGame') & go('settings') : null
  })

  add(['resetLooper'])

  action('resetLooper', _ => {
    no.isHovered() ? no.changeSprite('noHover') : no.changeSprite('no')
    yes.isHovered() ? yes.changeSprite('yesHover') : yes.changeSprite('yes')
  })
})

scene('game', () => {
  gravity(1500)
  sizex = 1

  layers(['particle', 'game', 'shop', 'overlay'], 'game')
  
  cps = Utils.readObject('cps')
  baseclick = Utils.readObject('click')
  click = baseclick
  upgradeCount = 1
  score = Utils.readObject('score')
  maxDice = Utils.readObject('diceCount')
  maxCoin = Utils.readObject('coinCount')

  decRotate = 0
  kbRotate = 0

  cPrice = Utils.readObject('cPrice') // 100
  aPrice = Utils.readObject('aPrice') // 150
  uPrice = Utils.readObject('uPrice') // 500
  click_inc = Utils.readObject('click_inc') // 1.7
  auto_inc = Utils.readObject('auto_inc') // 1.5
  max = 90000000

  clickstat_inc = Utils.readObject('clickstat_inc') // 1
  cps_inc = Utils.readObject('cps_inc') // 0.3

  isUltra = false
  ultraTime = 10
  timer = 0

  showD = Utils.readObject('showDice')
  showC = Utils.readObject('showCoin')

  timeBar = add([
    rect(0, 10),
    pos(0, 0),
    layer('overlay')
  ])

  backdrop = add([
    sprite('backdrop'),
    pos(width() / 2, height() / 2 - 96),
    scale(width() / 1920 * 0.8),
    origin('center'),
    rotate(kbRotate)
  ])

  dice = add([
    sprite('dice'),
    pos(width() / 2, height() / 2 - 96),
    origin('center'),
    rotate(kbRotate)
  ])

  // Player Statistics
  add([
    text('Stats', width() / 1920 * 48),
    pos(width() * 0.66, height() - width() * 0.0575),
    origin('botleft'),
    layer('overlay')
  ])

  clickTxt = add([
    text(click + ' /', width() / 1920 * 32),
    pos(width() * 0.961, height() - width() * 0.0925),
    origin('botright'),
    layer('overlay')
  ])

  add([
    sprite('click'),
    pos(width() * 0.965, height() - width() * 0.0925),
    origin('botright'),
    scale(width() / 1920 * 0.2),
    layer('overlay')
  ])

  add([
    sprite('chip'),
    pos(width() * 0.9515, height() - width() * 0.103),
    origin('botright'),
    scale(width() / 1920 * 0.035),
    layer('overlay')
  ])

  // Auto Click/Second
  cpsTxt = add([
    text(cps + 'CPS', width() / 1920 * 32),
    pos(width() * 0.965, height() - width() * 0.0625),
    origin('botright'),
    layer('overlay')
  ])

  // Chip Amount
  add([
    sprite('chip'),
    pos(width() * 0.965, height() - width() * 0.0325),
    origin('botright'),
    scale(width() / 1920 * 0.06),
    layer('overlay')
  ])

  scrTxt = add([
    text(score, width() / 1920 * 32),
    pos(width() * 0.9435, height() - width() * 0.0325),
    origin('botright'),
    layer('overlay')
  ])

  // Upgrade Shop
  add([
    sprite('shop'),
    pos(0, height() - (sprite('shop').height * width() / 1920)),
    scale(width() / 1920),
    layer('shop')
  ])

  // Chips/Click
  upgradeClick = add([
    sprite('upgrade'),
    pos(width() * 0.034, height() - width() * 0.035),
    scale(width() / 1920),
    origin('botleft'),
    layer('overlay')
  ])

  clickChipIcon = add ([
    sprite('chip'),
    pos(width() * 0.05, height() - width() * 0.0865),
    scale(width() / 1920 * 0.1),
    layer('overlay')
  ])

  clickSprite = add ([
    sprite('click'),
    pos(width() * 0.066, height() - width() * 0.07),
    scale(width() / 1920 * 0.25),
    layer('overlay')
  ])

  clickPriceTxt = add ([
    text(cPrice, width() / 1920 * 24),
    pos(width() * 0.178, height() - width() * 0.08),
    origin('topright'),
    layer('overlay')
  ])

  clickPrice = add([
    sprite('chip'),
    pos(width() * 0.181, height() - width() * 0.084),
    scale(width() / 1920 * 0.075),
    layer('overlay')
  ])

  // Auto CPS
  upgradeAuto = add([
    sprite('upgrade'),
    pos(width() * 0.232, height() - width() * 0.035),
    scale(width() / 1920),
    origin('botleft'),
    layer('overlay')
  ])

  autoSprite = add([
    sprite('click'),
    pos(width() * 0.248, height() - width() * 0.09),
    scale(width() / 1920 * 0.45),
    layer('overlay')
  ])

  autoTxt = add([
    text('auto', width() / 1920 * 10),
    pos(width() * 0.25, height() - width() * 0.06),
    layer('overlay')
  ])

  autoPriceTxt = add ([
    text(aPrice, width() / 1920 * 24),
    pos(width() * 0.376, height() - width() * 0.08),
    origin('topright'),
    layer('overlay')
  ])

  autoPrice = add([
    sprite('chip'),
    pos(width() * 0.378, height() - width() * 0.084),
    scale(width() / 1920 * 0.075),
    layer('overlay')
  ])

  // Tempo x8 Chips/Click
  ultraUpgrade = add([
    sprite('upgrade'),
    pos(width() * 0.43, height() - width() * 0.035),
    scale(width() / 1920),
    origin('botleft'),
    layer('overlay')
  ])

  ultraSprite = add([
    sprite('lightning'),
    pos(width() * 0.446, height() - width() * 0.09),
    scale(width() / 1920 * 0.13),
    layer('overlay')
  ])

  ultraTxt = add([
    text('4x', width() / 1920 * 12),
    pos(width() * 0.4613, height() - width() * 0.065),
    layer('overlay')
  ])

  ultraPriceTxt = add([
    text(uPrice, width() / 1920 * 24),
    pos(width() * 0.5742, height() - width() * 0.8),
    origin('topright'),
    layer('overlay')
  ])

  ultraPrice = add([
    sprite('chip'),
    pos(width() * 0.577, height() - width() * 0.084),
    scale(width() / 1920 * 0.075),
    layer('overlay')
  ])

  back = add([
    sprite('back'),
    pos(width() * 0.03, width() * 0.03),
    scale(width() / 1920 * 0.8),
    origin('topleft')
  ])

  mouseClick(() => {
    if (back.isClicked()) {
      Utils.saveObject('score', score)
      Utils.saveObject('cps', cps)
      Utils.saveObject('click', baseclick)
      Utils.saveObject('cPrice', cPrice)
      Utils.saveObject('aPrice', aPrice)
      Utils.saveObject('uPrice', uPrice)
      go('menu')
    }
  })

  // Make a time bar when ultra mode is on
  function ultraify() {
    if (timer >= ultraTime) {
      ultraTime = 10
      isUltra = false
      destroy(timeBar)
      timeBar = add([
        rect(0, 10),
        pos(0, 0),
        layer('overlay')
      ])
      timer = 0
      clearInterval(interval)
    }
    else {
      isUltra = true
      destroy(timeBar)
      timeBar = add([
        rect(width() / ultraTime * timer, 10),
        pos(0, 0),
        layer('overlay')
      ])
      timer += 1
    }
  }

  mouseClick(() => {
    if (dice.isClicked()) {
      play('click')
      sizex = 0
      score += click
      scrTxt.text = score

      if (showC) {
        for (i = 0; i < upgradeCount && i < maxCoin; i++) {
          const chipper = add([
            sprite('chip'),
            pos(rand(96, width() - 96), rand(-128, -8)),
            origin('center'),
            scale(width() / 1920 * 0.1),
            color(rgba(1, 1, 1, 0.7)),
            body(),
            layer('particle')
          ])
          wait(2, () => {destroy(chipper)})
        }
      }

      if (showD) {
        for (ii = 0; ii < upgradeCount && ii < maxDice; ii++) {
          const mini = add([
            sprite('dice'),
            pos(width() / 2, height() / 2 - 150),
            origin('center'),
            scale(width() / 1920 * 0.1),
            color(rgba(1, 1, 1, 0.7)),
            body(),
            layer('particle')
          ])
          
          mini.jump(800)
          
          const move_rate = rand(-512, 512)
          
          mini.action(() => {mini.move(move_rate, 0)})
          
          wait(2, () => {destroy(mini)})
        }
      }
      
    }

    // Stats upgrade
    if ((upgradeClick.isClicked() || clickChipIcon.isClicked() || clickSprite.isClicked() || clickPriceTxt.isClicked() || clickPrice.isClicked()) && score >= cPrice)
    { 
      play('upgrade')
      baseclick += Math.ceil(baseclick * clickstat_inc)
      score -= cPrice
      click = baseclick
      upgradeCount < 10 ? upgradeCount++ : null
      clickTxt.text = click + ' /'
      scrTxt.text = score
      cPrice < max ? cPrice = Math.ceil(cPrice * click_inc) : cPrice = 'Max'
      clickstat_inc > 1.15 ? clickstat_inc -= 0.3 : null
      click_inc > 1.15 ? click_inc -= 0.05 : null
      clickPriceTxt.text = cPrice
    }

    if ((upgradeAuto.isClicked() || autoSprite.isClicked() || autoTxt.isClicked() || autoPriceTxt.isClicked() || autoPrice.isClicked()) && score >= aPrice)
    {
      play('upgrade')
      score -= aPrice
      cps == 0 ? cps = 1 : cps += Math.ceil(cps *= cps_inc)
      auto_inc > 1.15 ? auto_inc -= 0.05 : null
      cps_inc > 0.2 ? cps_inc -= 0.01 : null
      aPrice < max ? aPrice = Math.ceil(aPrice * auto_inc) : aPrice = 'Max'
      autoPriceTxt.text = aPrice
      scrTxt.text = score
      cpsTxt.text = cps + 'CPS'
    }

    if ((ultraUpgrade.isClicked() || ultraSprite.isClicked() || ultraTxt.isClicked() || ultraPriceTxt.isClicked() || ultraPrice.isClicked()) && score >= uPrice)
    {
      play('upgrade')
      isUltra == true ? ultraTime += 10 : interval = setInterval(ultraify, 1000) & ultraify()
      uPrice < max ? uPrice = Math.ceil(uPrice * 2.5) : uPrice = 'Max'
      ultraPriceTxt.text = uPrice
    }
  })

  // Loop every second to add CPS to score
  loop(1, () => {
    score += cps
    scrTxt.text = score

    Utils.saveObject('score', score)
    Utils.saveObject('cps', cps)
    Utils.saveObject('click', baseclick)
    Utils.saveObject('cPrice', cPrice)
    Utils.saveObject('aPrice', aPrice)
    Utils.saveObject('uPrice', uPrice)
  })

  // Rotate TechRoulette Dice and Backdrop
  // Credit to ExecuteClick by @JacksonSmith2 on repl.it
  add(['clock'])

  action('clock', _ => {
    sizex++
    destroy(dice)
    destroy(backdrop)
    decRotate -= 1
    kbRotate = Math.PI / 2 * decRotate / 180
    
    backdrop = add([
      sprite('backdrop'),
      pos(width() / 2, height() / 2 - 96),
      scale(width() / 1920 * (Math.pow(1.05, -sizex) + 1) * 0.5),
      origin('center'),
      rotate(kbRotate/5)
    ])
    
    dice = add([
      sprite('dice'),
      pos(width() / 2, height() / 2 - 96),
      scale(width() / 1920 * (Math.pow(1.25, -sizex) + 1) * 0.5),
      origin('center'),
      rotate(kbRotate)
    ])

    if (upgradeClick.isHovered()) {
      upgradeClick.changeSprite('upgradeHover')
      clickChipIcon.pos.y = (height() - width() * 0.0865) + (sprite('upgrade').height / 9)
      clickSprite.pos.y = (height() - width() * 0.07) + (sprite('upgrade').height / 9)
      clickPriceTxt.pos.y = (height() - width() * 0.08) + (sprite('upgrade').height / 9)
      clickPrice.pos.y = (height() - width() * 0.084) + (sprite('upgrade').height / 9)
    }
    else {
      upgradeClick.changeSprite('upgrade')
      clickChipIcon.pos.y = height() - width() * 0.0865
      clickSprite.pos.y = height() - width() * 0.07
      clickPriceTxt.pos.y = height() - width() * 0.08
      clickPrice.pos.y = height() - width() * 0.084
    }
    
    if (upgradeAuto.isHovered()) {
      upgradeAuto.changeSprite('upgradeHover')
      autoSprite.pos.y = (height() - width() * 0.09) + (sprite('upgrade').height / 9)
      autoTxt.pos.y = (height() - width() * 0.06) + (sprite('upgrade').height / 9)
      autoPriceTxt.pos.y = (height() - width() * 0.08) + (sprite('upgrade').height / 9)
      autoPrice.pos.y = (height() - width() * 0.084) + (sprite('upgrade').height / 9)
    }
    else {
      upgradeAuto.changeSprite('upgrade')
      autoSprite.pos.y = height() - width() * 0.09
      autoTxt.pos.y = height() - width() * 0.06
      autoPriceTxt.pos.y = height() - width() * 0.08
      autoPrice.pos.y = height() - width() * 0.084
    }
    
    if (ultraUpgrade.isHovered()) {
      ultraUpgrade.changeSprite('upgradeHover')
      ultraSprite.pos.y = (height() - width() * 0.09) + (sprite('upgrade').height / 9)
      ultraTxt.pos.y = (height() - width() * 0.065) + (sprite('upgrade').height / 9)
      ultraPriceTxt.pos.y = (height() - width() * 0.08) + (sprite('upgrade').height / 9)
      ultraPrice.pos.y = (height() - width() * 0.084) + (sprite('upgrade').height / 9)
    }
    else {
      ultraUpgrade.changeSprite('upgrade')
      ultraSprite.pos.y = height() - width() * 0.09
      ultraTxt.pos.y = height() - width() * 0.065
      ultraPriceTxt.pos.y = height() - width() * 0.08
      ultraPrice.pos.y = height() - width() * 0.084
    }

    back.isHovered() ? back.changeSprite('backHover') : back.changeSprite('back')

    // 4x the base click rate
    isUltra ? click = baseclick * 4 : click = baseclick
    clickTxt.text = click + ' /'
  })

})


start('splash')