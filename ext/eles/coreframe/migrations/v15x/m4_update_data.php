<?php
namespace eles\coreframe\migrations\v15x; class m4_update_data extends \phpbb\db\migration\migration { public static function depends_on() { return array('\\eles\\coreframe\\migrations\\v10x\\m3_initial_module'); } public function update_data() { $sp5e5c56 = array(); $sp5e5c56[] = array('config_text.add', array('c_sidebar_pages', '')); return $sp5e5c56; } }