<?php

/* @vse_topicpreview/event/overall_header_head_append.html */
class __TwigTemplate_d423c6f0072fe295e49d1df81dd0843447aeac7fa996908c0161f6d24ec47547 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        if ((($context["S_TOPICPREVIEW"] ?? null) && ($context["TOPICPREVIEW_THEME"] ?? null))) {
            // line 2
            echo "\t";
            $asset_file = (("@vse_topicpreview/" . ($context["TOPICPREVIEW_THEME"] ?? null)) . ".css");
            $asset = new \phpbb\template\asset($asset_file, $this->getEnvironment()->get_path_helper(), $this->getEnvironment()->get_filesystem());
            if (substr($asset_file, 0, 2) !== './' && $asset->is_relative()) {
                $asset_path = $asset->get_path();                $local_file = $this->getEnvironment()->get_phpbb_root_path() . $asset_path;
                if (!file_exists($local_file)) {
                    $local_file = $this->getEnvironment()->findTemplate($asset_path);
                    $asset->set_path($local_file, true);
                }
                $asset->add_assets_version('29');
            }
            $this->getEnvironment()->get_assets_bag()->add_stylesheet($asset);        }
    }

    public function getTemplateName()
    {
        return "@vse_topicpreview/event/overall_header_head_append.html";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  21 => 2,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "@vse_topicpreview/event/overall_header_head_append.html", "");
    }
}
