// Initialization
kaboom({
	global: true,
	scale: 1,
	fullscreen: true,
	debug: true,
  clearColor: [0.274, 0.450, 1, 1]
});

loadRoot('assets/')

sprites = ['backdrop', 'chip', 'click', 'dice', 'lightning', 'shop', 'steak', 'checkmark', 'checkmark_on', 'checkmark_clicked']
audios = ['click', 'play', 'startup', 'upgrade']
buttons = ['back', 'changelog', 'gear', 'play', 'up', 'down', 'upgrade']

sprites.forEach((name) => {loadSprite(name, 'imgs/' + name + '.png')})
buttons.forEach((name) => {loadSprite(name, 'imgs/' + name + '.png'); loadSprite(name + 'Hover', 'imgs/' + name + '_hover.png')})
audios.forEach((name) => {loadSound(name, 'auds/' + name + '.wav')})

loadFont('Mono', 'imgs/mono.png', 32, 64, " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~©")

console.log(width() + 'x' + height())

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
    splash_size++;
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
    if (playBtn.isClicked()) {play('play'); go('game')}
    if (settingsBtn.isClicked()) {go('settings')}
    if (changelogBtn.isClicked()) {go('changelog')}
  })

  if (Utils.readObject('ranGame') === null) {
    Utils.saveObject('ranGame', true)
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
  }

  add(['menuLooper'])

  action('menuLooper', _ => {
    if (changelogBtn.isHovered()) {changelogBtn.changeSprite('changelogHover')}
    else {changelogBtn.changeSprite('changelog')}
    
    if (settingsBtn.isHovered()) {settingsBtn.changeSprite('gearHover')}
    else {settingsBtn.changeSprite('gear')}
    
    if (playBtn.isHovered()) {playBtn.changeSprite('playHover')}
    else {playBtn.changeSprite('play')}
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
    pos(width() * 0.2, height() * 0.4),
    origin('left')
  ])

  add([
    text('Show Dice Particles', width() / 1920 * 26),
    pos(width() * 0.2, height() * 0.475),
    origin('left')
  ])

  add([
    text('Coin Particles Limit', width() / 1920 * 26),
    pos(width() * 0.2, height() * 0.55),
    origin('left')
  ])

  add([
    text('Dice Particles Limit', width() / 1920 * 26),
    pos(width() * 0.2, height() * 0.625),
    origin('left')
  ])

  coinMark = add([
    sprite('checkmark'),
    pos(width() * 0.75, height() * 0.4),
    scale(1080 / height() * 0.7),
    origin('right')
  ])

  diceMark = add([
    sprite('checkmark'),
    pos(width() * 0.75, height() * 0.475),
    scale(1080 / height() * 0.7),
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
    scale(height() / 1080 * 0.35),
    origin('botright')
  ])

  coinDown = add([
    sprite('down'),
    pos(width() * 0.75, height() * 0.555),
    scale(height() / 1080 * 0.35),
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
    scale(height() / 1080 * 0.35),
    origin('botright')
  ])

  diceDown = add([
    sprite('down'),
    pos(width() * 0.75, height() * 0.63),
    scale(height() / 1080 * 0.35),
    origin('topright')
  ])
  
  mouseClick(() => {
    if (back.isClicked()) {go('menu')}

    if (coinUp.isClicked()) {Utils.saveObject('coinCount', Utils.readObject('coinCount') + 1)}
    if (coinDown.isClicked()) {Utils.saveObject('coinCount', Utils.readObject('coinCount') - 1)}
    if (diceUp.isClicked()) {Utils.saveObject('diceCount', Utils.readObject('diceCount') + 1)}
    if (diceDown.isClicked()) {Utils.saveObject('diceCount', Utils.readObject('diceCount') - 1)}
  })
  
  add(['settingsLooper'])
  
  action('settingsLooper', _ => {
    if (back.isHovered()) {back.changeSprite('backHover')}
    else {back.changeSprite('back')}
    
    if (coinMark.isHovered()) {coinMark.color = rgba(1, 1, 1, 0.8)}
    else {coinMark.color = rgba(1, 1, 1, 1,)}
    
    if (diceMark.isHovered()) {diceMark.color = rgba(1, 1, 1, 0.8)}
    else {diceMark.color = rgba(1, 1, 1, 1)}
    
    if (coinMark.isClicked()) {coinMark.changeSprite('checkmark_clicked'); Utils.saveObject('showCoin', !Utils.readObject('showCoin'))}
    else if (Utils.readObject('showCoin') === true) {coinMark.changeSprite('checkmark_on')}
    else {coinMark.changeSprite('checkmark')}
    
    if (diceMark.isClicked()) {diceMark.changeSprite('checkmark_clicked'); Utils.saveObject('showDice', !Utils.readObject('showDice'))}
    else if (Utils.readObject('showDice') === true) {diceMark.changeSprite('checkmark_on')}
    else {diceMark.changeSprite('checkmark')}
    
    if (coinUp.isHovered()) {coinUp.changeSprite('upHover')}
    else {coinUp.changeSprite('up')}
    
    if (coinDown.isHovered()) {coinDown.changeSprite('downHover')}
    else {coinDown.changeSprite('down')}
    
    if (diceUp.isHovered()) {diceUp.changeSprite('upHover')}
    else {diceUp.changeSprite('up')}
    
    if (diceDown.isHovered()) {diceDown.changeSprite('downHover')}
    else {diceDown.changeSprite('down')}

    coinLimit.text = Utils.readObject('coinCount')
    diceLimit.text = Utils.readObject('diceCount')
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
    text('v1.0-beta1\nChangelog', 48),
    pos(width() / 2, height() / 2),
    origin('center')
  ])

  mouseClick(() => {
    if (back.isClicked()) {go('menu')}
  })

  add(['changelogLooper'])

  action('changelogLooper', _ => {
    if (back.isHovered()) {back.changeSprite('backHover')}
    else {back.changeSprite('back')}
  })
})

scene('game', () => {
  gravity(1500);
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
  inc = 1.35

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
    scale(0.8),
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
    text('Stats', 48),
    pos(width() * 0.66, height() - width() * 0.0575),
    origin('botleft'),
    layer('overlay')
  ])

  clickTxt = add([
    text(click + ' /', 32),
    pos(width() * 0.961, height() - width() * 0.0925),
    origin('botright'),
    layer('overlay')
  ])

  add([
    sprite('click'),
    pos(width() * 0.965, height() - width() * 0.0925),
    origin('botright'),
    scale(0.2),
    layer('overlay')
  ])

  add([
    sprite('chip'),
    pos(width() * 0.9515, height() - width() * 0.103),
    origin('botright'),
    scale(0.035),
    layer('overlay')
  ])

  // Auto Click/Second
  cpsTxt = add([
    text(cps + 'CPS', 32),
    pos(width() * 0.965, height() - width() * 0.0625),
    origin('botright'),
    layer('overlay')
  ])

  // Chip Amount
  add([
    sprite('chip'),
    pos(width() * 0.965, height() - width() * 0.0325),
    origin('botright'),
    scale(0.06),
    layer('overlay')
  ])

  scrTxt = add([
    text(score, 32),
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
    scale(0.1),
    layer('overlay')
  ])

  clickSprite = add ([
    sprite('click'),
    pos(width() * 0.066, height() - width() * 0.07),
    scale(0.25),
    layer('overlay')
  ])

  clickPriceTxt = add ([
    text(cPrice, 32),
    pos(width() * 0.178, height() - width() * 0.0815),
    origin('topright'),
    layer('overlay')
  ])

  clickPrice = add([
    sprite('chip'),
    pos(width() * 0.181, height() - width() * 0.084),
    scale(0.075),
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
    scale(0.45),
    layer('overlay')
  ])

  autoTxt = add([
    text('auto', 10),
    pos(width() * 0.25, height() - width() * 0.06),
    layer('overlay')
  ])

  autoPriceTxt = add ([
    text(aPrice, 32),
    pos(width() * 0.376, height() - width() * 0.0815),
    origin('topright'),
    layer('overlay')
  ])

  autoPrice = add([
    sprite('chip'),
    pos(width() * 0.378, height() - width() * 0.084),
    scale(0.075),
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
    scale(0.13),
    layer('overlay')
  ])

  ultraTxt = add([
    text('4x', 12),
    pos(width() * 0.4613, height() - width() * 0.065),
    layer('overlay')
  ])

  ultraPriceTxt = add ([
    text(uPrice, 32),
    pos(width() * 0.5742, height() - width() * 0.0815),
    origin('topright'),
    layer('overlay')
  ])

  ultraPrice = add([
    sprite('chip'),
    pos(width() * 0.577, height() - width() * 0.084),
    scale(0.075),
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
      ultraTime = 10;
      isUltra = false;
      destroy(timeBar);
      timeBar = add([
        rect(0, 10),
        pos(0, 0),
        layer('overlay')
      ])
      timer = 0
      clearInterval(interval);
    }
    else {
      isUltra = true;
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
            scale(0.1),
            color(rgba(1, 1, 1, 0.7)),
            body(),
            layer('particle')
          ]);
          wait(2, () => {destroy(chipper)})
        }
      }

      if (showD) {
        for (ii = 0; ii < upgradeCount && ii < maxDice; ii++) {
          const mini = add([
            sprite('dice'),
            pos(width() / 2, height() / 2 - 150),
            origin('center'),
            scale(0.1),
            color(rgba(1, 1, 1, 0.7)),
            body(),
            layer('particle')
          ]);
          
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
      baseclick += Math.ceil(baseclick * 0.3 * inc);
      score -= cPrice;
      click = baseclick;
      if (upgradeCount < 10) {upgradeCount++}
      clickTxt.text = click + ' /';
      scrTxt.text = score;
      cPrice = Math.ceil(cPrice * inc);
      clickPriceTxt.text = cPrice
    }

    if ((upgradeAuto.isClicked() || autoSprite.isClicked() || autoTxt.isClicked() || autoPriceTxt.isClicked() || autoPrice.isClicked()) && score >= aPrice)
    {
      play('upgrade')
      if (cps == 0) {cps = 1}
      else  {cps += Math.ceil(cps * inc * 0.2);}
      score -= aPrice;
      aPrice = Math.ceil(aPrice * inc);
      autoPriceTxt.text = aPrice;
      scrTxt.text = score;
      cpsTxt.text = cps + 'CPS';
    }

    if ((ultraUpgrade.isClicked() || ultraSprite.isClicked() || ultraTxt.isClicked() || ultraPriceTxt.isClicked() || ultraPrice.isClicked()) && score >= uPrice)
    {
      play('upgrade')
      if (isUltra == true) {ultraTime += 10}
      else {interval = setInterval(ultraify, 1000); ultraify()}
      uPrice *= 2;
      ultraPriceTxt.text = uPrice;
    }
  })

  // Loop every second to add CPS to score
  loop(1, () => {
    score += cps
    scrTxt.text = score
  })

  // Rotate TechRoulette Dice and Backdrop
  // Credit to ExecuteClick by @JacksonSmith2 on repl.it
  add(['clock'])

  action('clock', _ => {
    sizex++;
    destroy(dice)
    destroy(backdrop)
    decRotate -= 1
    kbRotate = Math.PI / 2 * decRotate / 180;
    
    backdrop = add([
      sprite('backdrop'),
      pos(width() / 2, height() / 2 - 96),
      scale((Math.pow(1.05, -sizex) + 1) * 0.5),
      origin('center'),
      rotate(kbRotate/5)
    ])
    
    dice = add([
      sprite('dice'),
      pos(width() / 2, height() / 2 - 96),
      scale((Math.pow(1.25, -sizex) + 1) * 0.5),
      origin('center'),
      rotate(kbRotate)
    ])

    if (upgradeClick.isHovered()) {upgradeClick.changeSprite('upgradeHover')}
    else {upgradeClick.changeSprite('upgrade')}

    if (upgradeAuto.isHovered()) {upgradeAuto.changeSprite('upgradeHover')}
    else {upgradeAuto.changeSprite('upgrade')}

    if (ultraUpgrade.isHovered()) {ultraUpgrade.changeSprite('upgradeHover')}
    else {ultraUpgrade.changeSprite('upgrade')}

    if (back.isHovered()) {back.changeSprite('backHover')}
    else {back.changeSprite('back')}

    // 4x the base click rate
    if (isUltra) {click = baseclick * 4;}
    else {click = baseclick;}
    clickTxt.text = click + ' /'
  })

})


start('splash')