<?php
namespace eles\coreframe\migrations\v10x; class m2_initial_data extends \phpbb\db\migration\migration { public static function depends_on() { return array('\\eles\\coreframe\\migrations\\v10x\\m1_initial_schema'); } public function update_data() { $sp08528a = array(); $sp08528a[] = array('config.add', array('c_acp_init', false)); $sp9cb246 = (require __DIR__ . '/../../inc/cfg/opts.php'); $sp9b614e = (require __DIR__ . '/../../inc/cfg/opts-data.php'); foreach ($sp9cb246 as $sp30f84b => $spbdf859) { if ('config_text' === $spbdf859) { $sp08528a[] = array('config_text.add', array($sp30f84b, $sp9b614e[$sp30f84b])); } else { $sp08528a[] = array('config.add', array($sp30f84b, $sp9b614e[$sp30f84b])); } } return $sp08528a; } }